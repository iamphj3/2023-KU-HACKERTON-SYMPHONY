from os import environ
import time, json, sys, os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from dotenv import load_dotenv
from instagrapi import Client
from instagrapi.types import Media 
from fastapi import APIRouter, Query, status, HTTPException
from typing import List, Optional
from bson.objectid import ObjectId
from datetime import date, datetime, timedelta
from models import get_db
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from time import sleep
from AI.imageRetrieval import model_predict
from models.instagrapi_exceptions import handle_exception
import concurrent.futures
import random, httpx, asyncio, base64
from pydantic import BaseModel
from urllib.request import urlopen
db = get_db()

router = APIRouter(
	prefix="/hashtag",
    tags=["hashtag"]
)

load_dotenv()
cl = Client()
cl.handle_exception = handle_exception

username = environ["PROXY_USER_NAME"]
pw = environ["PROXY_PASSWORD"]
port = list()
for i in range(100):
    port.append(10000+i)
proxy = f"https://{username}:{pw}@gate.smartproxy.com:"+str(port[0])
cl.set_proxy(proxy)

#cl.login(environ["ACCOUNT_USERNAME"], environ["ACCOUNT_PASSWORD"])
#cl.dump_settings('./tmp/dump.json')

cl.load_settings('./tmp/dump.json')
cl.get_timeline_feed() 

def get_hashtag_medias(medias):
    #start = time.time()
    print("생성")
    #medias = cl.hashtag_medias_recent_v1(tag, amount=amount)
    #print("1) tag:"+tag+" "+" amount:"+str(amount)+" timetotal:", time.time() - start) 
    #start = time.time()
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
        new_doc["instagram_url"] = "https://www.instagram.com/p/"+doc["code"]
        new_doc["isAds"] = False
        new_doc["image_rank"] = 0
        new_doc["sort_rank"] = 0

        #광고 여부 
        check_ads = ['광고', '협찬', '공구', '리그램']
        for ads in check_ads:
            if ads in doc["caption_text"]:
                new_doc["isAds"] = True
                break
        new_data.append(new_doc)

    #print("2) tag:"+tag+" "+" amount:"+str(amount)+" timetotal:", time.time() - start) 
    return new_data

#def process_function(tag, amount):
#    return cl.hashtag_medias_recent_v1(tag, amount=amount)

class Hashtag(BaseModel):
    period : int
    isAds: bool
    hashtags : List[str]
    image_url: Optional[str] = None


@router.post("/", status_code=status.HTTP_201_CREATED)
async def post_hashtags(hastag : Hashtag):
    #프록시 설정
    idx = random.randrange(1,100)
    new_proxy = f"https://{username}:{pw}@gate.smartproxy.com:"+str(port[idx])
    cl.set_proxy(new_proxy)
    start = time.time()
    current_date = datetime.today()

    #top 기록 
    for tag in hastag.hashtags: 
        await db["top"].insert_one({"tag" :tag, "date": current_date})

    ##tag_id 저장
    #join한 적 있으면 tagsId에서 삭제
    tag_obj = await find_tag_id(hastag.hashtags)
    if tag_obj is not None: # tag_obj 삭제
        await db["tagsId"].find_one_and_delete({"_id" : ObjectId(tag_obj.get("_id"))})
    
    hastag.hashtags.sort()
    if hastag.image_url is not None:
        result = await db["tagsId"].insert_one({"tags": hastag.hashtags, 
                                    "isLast":False, "isLike":False, "isComment":False, "isImage":True}) 
    else: 
        result = await db["tagsId"].insert_one({"tags": hastag.hashtags, 
                                    "isLast":False, "isLike":False, "isComment":False, "isImage":False}) 
    tag_id = str(result.inserted_id)

    #검색
    fix_amount = 50
    amount = (int)(fix_amount/len(hastag.hashtags))
    if(amount<20): amount = 20
    print(amount)
    collection_names = await db.list_collection_names()
    
    results = []
    with concurrent.futures.ProcessPoolExecutor() as executor:
        for tag in hastag.hashtags:
            if not(tag in collection_names):  # 중복 확인
                future = executor.submit(cl.hashtag_medias_recent_v1, tag, amount)
                results.append(future)

    ##멀티쓰레드 
    # with concurrent.futures.ThreadPoolExecutor() as executor:
    #     for tag in hastag.hashtags:
    #         if not(tag in collection_names): # 중복 확인
    #             future = executor.submit(get_hashtag_medias, tag, amount)
    #             results.append(future)

    for tag, future in zip(hastag.hashtags, results):
        if future.done():
            result = future.result()
            data = get_hashtag_medias(result)
            if len(data)!=0:
                await db[tag].insert_many(data)


    #조인 테이블 생성
    await tags_union(tag_id, hastag.hashtags)

    
    if(hastag.isAds): #광고제거
        await db[tag_id].delete_many({"isAds": True})
    if(hastag.period>0): #기간필터
        current_date = datetime.now()
        days_ago = current_date - timedelta(days=hastag.period)
        print(days_ago)
        await db[tag_id].delete_many({"date": {
            "$lte": days_ago
        }})
    
    #AI 모델 
    if hastag.image_url is not None :
        cursor = db[tag_id].find()
        docs = await cursor.to_list(length=50)
        img_docs = list()
        for doc in docs:
            if doc["image_url"] is not None:
                img_docs.append({"id":str(doc["_id"]), "image_url":doc["image_url"]})
        sort_images = model_predict(hastag.image_url, img_docs)
        for idx, sort in enumerate(sort_images):
            await db[tag_id].find_one_and_update({"_id":ObjectId(sort["id"])},{"$set":{"image_rank":idx+1}})
        await db[tag_id].delete_many({"image_rank":0})
    
    print("total time// amount:"+str(amount)+" timetotal:", time.time() - start)
    return {"status": 201, "message": "검색 종료"}

#
##
@router.get("/fetch")
async def fetch_data(image_url):
    try: 
        with urlopen(image_url) as response:
            blob = response.read()
        encoded_data = base64.b64encode(blob).decode('utf-8')
        return {"status": 200, "data" : encoded_data}
    except Exception as e:
        raise HTTPException(status_code=400, detail={"status":400, "message":"image url 확인"})    
   

#
##collection 합집합 적용 
async def tags_union(tag_id:str, hashtags : List[str] = Query(None)):
    pipeline = []
    stand_tag = None
    collection_names = await db.list_collection_names()
    for tag in hashtags:
        if tag in collection_names : # 검색 결과 O
            if stand_tag is None : # 첫 collection 
                stand_tag = tag
            else :
                pipeline.append({
                    "$unionWith":{
                        "coll": tag
                    }
                })

    pipeline.append({"$out":tag_id})

    if stand_tag is not None:
        cursor = db[stand_tag].aggregate(pipeline)
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
    
        
    await update_sort(tag_id, True, False, False)
 
 #
 ##[GET] 해시태그 검색 결과 
@router.get("/")
async def get_hashtags(tag_id:str, lastId:str):
    amount = 10
    res = {}
    query = {}

    #정렬
    sort_op = []
    sort_doc = await db["tagsId"].find_one({"_id":ObjectId(tag_id)})
    if sort_doc["isImage"]:
        sort_op.append(('image_rank', 1))
        if(lastId!="000000000000000000000000"):
            last_id = await db[tag_id].find_one({"_id":ObjectId(lastId)})
            if last_id is None :
                raise HTTPException(status_code=400, detail={"status":400, "message":"잘못된 lastId 전달"})
            query["image_rank"] = { "$gt": last_id["image_rank"] }
    else:
        if sort_doc["isLast"]+sort_doc["isLike"]+sort_doc["isComment"] == 1:
            sort_op.append(('sort_rank', 1))
            if(lastId!="000000000000000000000000"):
                last_id = await db[tag_id].find_one({"_id":ObjectId(lastId)})
                if last_id is None :
                    raise HTTPException(status_code=400, detail={"status":400, "message":"잘못된 lastId 전달"})
                query["sort_rank"] = { "$gt": last_id["sort_rank"] }  

    if len(sort_op) == 0:
        query["_id"] = { "$gt": ObjectId(lastId) }
        cursor = db[tag_id].find(query)
    else :    
        cursor = db[tag_id].find(query).sort(sort_op)
    
    docs = await cursor.to_list(length=amount)

    # 마지막 요청인지 
    if(len(docs)==0): 
        raise HTTPException(status_code=204, detail={"status":204, "message":"해당 조건에 맞는 검색 결과가 없습니다.(마지막 요청입니다.)"})
    

    query_id = {}
    query_id["_id"] = { "$gt": ObjectId(lastId) }
    
    results = list()
    for doc in docs:
        doc["id"] = str(doc["_id"])
        doc.pop("_id" ,None)

    res["results"] = docs
    return {"message": "조회 성공","data" : res}

#
##해시태그 조합 검색
async def find_tag_id(hashtags : List[str] = Query(None)): #해시태그 조합 검색
    find_tags = list()
    for tag in hashtags:
        find_tags.append(tag)
    find_tags.sort()

    return await db["tagsId"].find_one({"tags":find_tags})

#
##[GET] 해시태그 조합 tag_id get
@router.get("/id")
async def get_tag_id(hashtags : List[str] = Query(None)): 
    tag_obj = await find_tag_id(hashtags)

    if tag_obj is None: #검색결과 없음 return 
        raise HTTPException(status_code=204, detail={"status":204, "message":"검색 결과가 존재하지 않습니다."})
    
    return {"status":200, "message": "tag id return 성공", "data": {"tag_id" : str(tag_obj.get("_id"))}}

#
##[POST] tag_id collection sort 
@router.post("/sort", status_code=status.HTTP_201_CREATED)
async def update_sort(tag_id:str, isLast:bool, isLike:bool, isComment:bool):
    if (isLast + isLike + isComment) > 1: 
        raise HTTPException(status_code=400, detail={"status":400, "message":"하나의 값만 true로 설정할 수 있습니다."})

    sort_op = []
    #정렬
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

    return {"status":200, "message": "테이블 정렬 완료 : get으로 다시 요청 해주세요"}
     
@router.get("/total")
async def get_total(tag_id:str):
    total = await db[tag_id].count_documents({})
    return {"message": "tag_id: "+tag_id + " 게시물 개수 return 성공","data" : total}


@router.get("/top")
async def get_top(period : int):
    query = {}
    if period != 1 and period !=7 :
        raise HTTPException(status_code=400, detail={"status":400, "message":"period는 1과 7중에 선택해 전달해주세요."})
    

    #기간 정렬
    current_date = datetime.today()
    days_ago = current_date - timedelta(days=period)
    days_ago = days_ago.replace(hour=0, minute=0, second=0, microsecond=0)
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
    result = list()
    for doc in docs:
        result.append(doc.get('_id'))
    return {"status":200, "message": "top 10 list return 성공", "data" : result}