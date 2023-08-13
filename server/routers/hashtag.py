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
    # for tag in hashtags:
    #     #검색량 저장
    #     medias = cl.hashtag_medias_top_v1(tag, amount=amount)
    #     new_data = []
    #     for media in medias:
    #         mtemp = json.dumps(media.__dict__, default=str)
    #         new_data.append(json.loads(mtemp))
    #     result = await db[tag].insert_many(new_data)

    #교집합 찾기 
    pipeline = []
    for idx, tag in enumerate(hashtags):
        if(idx!=0):
            pipeline.append({
                "$lookup":{
                    "from": tag,
                    "localField": 'pk', 
                    "foreignField": 'pk', 
                    "as": "joined"
                }
            })
    pipeline.append({"$match":{"joined":{"$ne": []}}})
    cursor = db[hashtags[0]].aggregate(pipeline)
    inner = await cursor.to_list(length=None)

    #조인 테이블 생성
    
 
@router.get("/hashtag/id")
async def get_tag_id(hashtags : List[str] = Query(None)):
    find_tags = list()
    for tag in hashtags:
        find_tags.append(tag)
    find_tags.sort()

    tag_obj = await db["tagsId"].find_one({"tags":find_tags})
    return str(tag_obj.get("_id"))

@router.get("/")
async def get_hashtags(tag_id:str, lastId:int, 
            period:int, isAds:bool):
    tag_obj = await db["tagsId"].find_one({"_id":ObjectId(tag_id)})
    hashtags = tag_obj.get("tags")
    
    

        
    #response
    #period
    #Ads
    #result

@router.get("/top")
async def get_top():
    cursor = db["top"].find().sort([('cnt',-1)])
    docs = await cursor.to_list(length=10)
    result = list()
    for doc in docs:
        result.append(doc.get('tag'))
    return result   
