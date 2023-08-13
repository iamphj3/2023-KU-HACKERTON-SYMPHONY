from os import environ
import time, json
from dotenv import load_dotenv
from instagrapi import Client
from instagrapi.types import Media 
from fastapi import APIRouter, Query
from typing import List
from bson.objectid import ObjectId

from models import get_db
db = get_db()

router = APIRouter(
	prefix="/hashtag",
    tags=["hashtag"]
)

load_dotenv()
cl = Client()

#cl.login(environ["ACCOUNT_USERNAME"], environ["ACCOUNT_PASSWORD"])
#cl.login("insta_gadmin", "ins123tag@!")
#cl.dump_settings('./tmp/dump.json')
#cl.login_by_sessionid(os.environ["SESSION_ID"])
#cl.set_proxy("https://61.37.223.152:8080")

cl.load_settings('./tmp/dump.json')
cl.get_timeline_feed()

@router.post("/")
async def post_hashtags(hashtags : List[str] = Query(None)):
    #top 기록 
    for tag in hashtags:
        await db["top"].find_one_and_update({"tag": tag}, {'$inc':{"cnt":1}}, upsert=True)
    
    #tag_id 저장
    hashtags.sort()
    result = await db["tagsId"].insert_one({"tags":hashtags}) 
    tag_id = str(result.inserted_id)

    amount = 20
    collection_names = await db.list_collection_names()
    for tag in hashtags:
        #검색량 저장
        medias = cl.hashtag_medias_top_v1(tag, amount=amount)
        if not(tag in collection_names): #검색 기록 확인
            new_data = []
            for media in medias:
                mtemp = json.dumps(media.__dict__, default=str)
                new_data.append(json.loads(mtemp))
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
async def get_hashtags(tag_id:str, lastId:str, period:int, isAds:bool):
    res = list()
    amount = 20
    #tag_obj = await db["tagsId"].find_one({"_id":ObjectId(tag_id)})
    #hashtags = tag_obj.get("tags")
    
    query = { "_id": { "$gt": ObjectId(lastId) } }
    cursor = db[tag_id].find(query)
    docs = await cursor.to_list(length=amount)
    if len(docs)==amount: # 마지막 요청인지 
        res.append({"isFinal":False})
    else:
        res.append({"isFinal":True}) 
    
    results = list()
    for doc in docs:
        new_doc = list()
        new_doc.append({"id":str(doc["_id"])})
        new_doc.append({"date":doc["taken_at"]})
        new_doc.append({"user_name":doc["user"]})
        new_doc.append({"image_url":doc["thumbnail_url"]})
        new_doc.append({"text":doc["caption_text"]})
        new_doc.append({"like_count":doc["like_count"]})
        new_doc.append({"comment_count":doc["comment_count"]})
        results.append(new_doc)
    res.append({"results":results})
    return res
    #기간 정렬
    #광고 제거 

@router.get("/hashtag/id")
async def get_tag_id(hashtags : List[str] = Query(None)):
    find_tags = list()
    for tag in hashtags:
        find_tags.append(tag)
    find_tags.sort()

    tag_obj = await db["tagsId"].find_one({"tags":find_tags})
    return str(tag_obj.get("_id"))

@router.post("/sort")
async def update_sort(tag_id:str, isLast:bool, isLike:bool, isComment:bool):
    return     

@router.get("/top")
async def get_top():
    cursor = db["top"].find().sort([('cnt',-1)])
    docs = await cursor.to_list(length=10)
    result = list()
    for doc in docs:
        result.append(doc.get('tag'))
    return result   
