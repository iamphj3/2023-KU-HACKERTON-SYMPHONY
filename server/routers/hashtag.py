from os import environ
import time, json, sys, os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from dotenv import load_dotenv
from instagrapi import Client
from instagrapi.types import Media 
from fastapi import APIRouter, Query, status
from typing import List, Optional
from bson.objectid import ObjectId
from datetime import date, datetime, timedelta
from models import get_db
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from time import sleep
from AI.imageRetrieval import model_predict
db = get_db()

router = APIRouter(
	prefix="/hashtag",
    tags=["hashtag"]
)

load_dotenv()
cl = Client()


username = environ["PROXY_USER_NAME"]
pw = environ["PROXY_PASSWORD"]
proxy = f"https://{username}:{pw}@gate.smartproxy.com:10002"
cl.set_proxy(proxy)

#cl.login(environ["ACCOUNT_USERNAME"], environ["ACCOUNT_PASSWORD"])
#cl.dump_settings('./tmp/dump.json')

cl.load_settings('./tmp/dump.json')
cl.get_timeline_feed()

@router.post("/", status_code=status.HTTP_201_CREATED)
async def post_hashtags(hashtags : List[str] = Query(None)):
    current_date = datetime.today()

    #top 기록 
    for tag in hashtags:
        #await db["top"].find_one_and_update({"tag": tag}, {'$inc':{"cnt":1}}, upsert=True)
        await db["top"].insert_one({"tag" :tag, "date": current_date})
    #tag_id 저장
    hashtags.sort()
    result = await db["tagsId"].insert_one({"tags":hashtags, 
                                "isLast":False, "isLike":False, "isComment":False}) 
    tag_id = str(result.inserted_id)

    amount = 20
    collection_names = await db.list_collection_names()
    for tag in hashtags:
        #검색량 저장
        medias = cl.hashtag_medias_top_v1(tag, amount=amount)
        if not(tag in collection_names): #검색 기록 확인
            new_data = []
            for media in medias:
                doc = media.dict()
                new_doc = {}
                new_doc["pk"] = str(doc["pk"])
                new_doc["id"] = str(doc["id"])
                new_doc["date"] = doc["taken_at"]
                new_doc["user_name"] = doc["user"]["username"]
                if doc["thumbnail_url"] is not None :
                    new_doc["image_url"] = doc["thumbnail_url"]
                else:
                    new_doc["image_url"] = doc["resources"][0]["thumbnail_url"]
                new_doc["text"] = doc["caption_text"]
                new_doc["like_count"] = doc["like_count"]
                new_doc["comment_count"] = doc["comment_count"]
                new_doc["isAds"] = False
                new_doc["image_rank"] = 0
                new_doc["sort_rank"] = 0
                #광고 여부 
                check_ads = ['광고', '협찬', '공구']
                for ads in check_ads:
                    if ads in doc["caption_text"]:
                        new_doc["isAds"] = True
                        break
                new_data.append(new_doc)
            result = await db[tag].insert_many(new_data)

    #조인 테이블 생성
    await tags_union(tag_id, hashtags)

#합집합 
async def tags_union(tag_id:str, hashtags : List[str] = Query(None)):
    #collection 합치기
    pipeline = []
    for idx, tag in enumerate(hashtags):
        if(idx!=0):
            pipeline.append({
                "$unionWith":{
                    "coll": tag
                }
            })
    pipeline.append({"$out":tag_id})
    cursor = db[hashtags[0]].aggregate(pipeline)
    await cursor.to_list(length=None)

    #중복 찾기
    pipeline = [
        {
            "$group": {
                "_id": "$pk",  # 중복을 확인하려는 필드로 수정
                "count": {"$sum": 1},
                "duplicates": {"$addToSet": "$_id"}
            }
        },
        {"$match": {"count": {"$gt": 1}}}
    ]
    cursor = db[tag_id].aggregate(pipeline)
    duplicates = await cursor.to_list(length=None)

    #중복 제거
    for doc in duplicates:
        duplicate_ids = doc["duplicates"]
        del duplicate_ids[0]
        db[tag_id].delete_many({"_id": {"$in": duplicate_ids}})
 
@router.get("/")
async def get_hashtags(tag_id:str, lastId:str, period:int, isAds:bool, image_url: Optional[str] = None):
    amount = 10
    res = {}
    query = {}
    #query["_id"] = { "$gt": ObjectId(lastId) }

    #기간 필터 
    current_date = datetime.now()
    days_ago = current_date - timedelta(days=period)
    if period !=0:
        query["date"] = {
            "$gte": days_ago,
            "$lte": current_date
        }   

    #광고 제거 
    if isAds:
        query["isAds"] = {"$ne":True}
    
    # #AI 모델 
    if lastId=="000000000000000000000000" and image_url is not None :
        cursor = db[tag_id].find()
        docs = await cursor.to_list(length=None)
        img_docs = list()
        for doc in docs:
            if doc["image_url"] is not None:
                img_docs.append({"id":str(doc["_id"]), "image_url":doc["image_url"]})
        sort_images = model_predict(image_url, img_docs)
        for idx, sort in enumerate(sort_images):
            await db[tag_id].find_one_and_update({"_id":ObjectId(sort["id"])},{"$set":{"image_rank":idx}})

    #정렬
    sort_op = []
    if image_url is not None:
        sort_op.append(('image_rank', 1))
        if(lastId!="000000000000000000000000"):
            last_id = await db[tag_id].find_one({"_id":ObjectId(lastId)})
            query["image_rank"] = { "$gt": last_id["image_rank"] }
    else:
        sort_doc = await db["tagsId"].find_one({"_id":ObjectId(tag_id)})
        if sort_doc["isLast"]+sort_doc["isLike"]+sort_doc["isComment"] == 1:
            sort_op.append(('sort_rank', 1))
            if(lastId!="000000000000000000000000"):
                last_id = await db[tag_id].find_one({"_id":ObjectId(lastId)})
                query["sort_rank"] = { "$gt": last_id["sort_rank"] }  

    if len(sort_op) == 0:
        query["_id"] = { "$gt": ObjectId(lastId) }
        cursor = db[tag_id].find(query)
    else :    
        cursor = db[tag_id].find(query).sort(sort_op)
    
    docs = await cursor.to_list(length=amount)

    # 마지막 요청인지 
    if(len(docs)==0): 
        res["isFinal"] = True
        return {"data" : res} # 결과 X
    
    res["isFinal"] = False 

    query_id = {}
    query_id["_id"] = { "$gt": ObjectId(lastId) }
    
    results = list()
    for doc in docs:
        doc["id"] = str(doc["_id"])
        doc.pop("_id" ,None)

    res["results"] = docs
    return {"data" : res}

@router.get("/hashtag/id")
async def get_tag_id(hashtags : List[str] = Query(None)):
    find_tags = list()
    for tag in hashtags:
        find_tags.append(tag)
    find_tags.sort()

    tag_obj = await db["tagsId"].find_one({"tags":find_tags})
    return {"data": {"tag_id" : str(tag_obj.get("_id"))}}

@router.post("/sort", status_code=status.HTTP_201_CREATED)
async def update_sort(tag_id:str, isLast:bool, isLike:bool, isComment:bool):
    if (isLast + isLike + isComment) > 1: return {"message":"하나의 값만 true로 설정할 수 있습니다."}

    sort_op = []

    #인덱스 
    if(isLike):
        await db[tag_id].create_index([('like_count', -1)])
        sort_op.append(('like_count', -1))
    if(isLast):
        await db[tag_id].create_index([('date', -1)])
        sort_op.append(('date', -1))
    if(isComment):
        await db[tag_id].create_index([('comment_count', -1)])
        sort_op.append(('comment_count', -1))
    
    if (isLast + isLike + isComment) == 1 :
        cursor = db[tag_id].find().sort(sort_op)
        docs = await cursor.to_list(length=None)

        for idx, doc in enumerate(docs):
            await db[tag_id].find_one_and_update({"_id":ObjectId(doc["_id"])},{"$set":{"sort_rank":idx}})
                
    await db["tagsId"].find_one_and_update({"_id":ObjectId(tag_id)},{"$set":{"isLast":isLast,"isLike":isLike,"isComment":isComment}})
     
@router.get("/total")
async def get_total(tag_id:str):
    total = await db[tag_id].count_documents({})
    return {"data" : total}

@router.get("/top")
async def get_top(period : int):
    query = {}
    #기간 정렬
    current_date = datetime.today()
    days_ago = current_date - timedelta(days=period)
    days_ago = days_ago.replace(hour=0, minute=0, second=0, microsecond=0)
    print(days_ago)
    pipeline = [
        {
            "$match": {
            "date": {
                "$gte": days_ago,
                "$lte": current_date
            }
        }},
        {
            "$group": {
            "_id": "$tag",
            "count": {"$sum": 1}
            }
        },
        {
            "$sort":{"count" : -1 }
        }
    ]

    cursor = db["top"].aggregate(pipeline)
    docs = await cursor.to_list(length=10)
    print(docs)
    result = list()
    for doc in docs:
        result.append(doc.get('_id'))
    return {"data" : result}