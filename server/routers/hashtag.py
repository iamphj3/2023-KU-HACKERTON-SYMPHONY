from os import environ
import time, json
from dotenv import load_dotenv
from instagrapi import Client
from instagrapi.types import Media 
from fastapi import APIRouter, Query
from typing import List

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

@router.get("/")
async def get_hashtags(tag_id:int, lastId:int, 
            period:int, isAds:bool, isScroll: bool, 
            hashtags : List[str] = Query(None)):
    if(not isScroll): #첫 요청
        amount = 20
        for tag in hashtags:
            #검색량 저장
            await db["top"].find_one_and_update({"tag": tag}, {'$inc':{"cnt":1}}, upsert=True)
        #     medias = cl.hashtag_medias_top_v1(tag, amount=amount)
        #     new_data = []
        #     for media in medias:
        #         mtemp = json.dumps(media.__dict__, default=str)
        #         new_data.append(json.loads(mtemp))
        #     result = await db[tag].insert_many(new_data)
        # #조인 테이블 생성
        # pipeline = [
        #     {
        #         "$lookup":{
        #             "from": hashtags[1],
        #             "localField": 'pk', 
        #             "foreignField": 'pk', 
        #             "as": 'joinedResult'
        #         }
        #     },
        #     {
        #         "$match": {
        #             "joinedResult": {"$ne": []}
        #         }
        #     },
        #     {
        #         "$out":"joinedResult"
        #     }
        # ]
        # cursor = db[hashtags[0]].aggregate(pipeline)
        # await cursor.to_list(length=None)
        #print(result)

        
    #response
    #period
    #Ads
    #result
    #return 

@router.get("/top")
async def get_top():
    cursor = db["top"].find().sort([('cnt',-1)])
    docs = await cursor.to_list(length=10)
    result = list()
    for doc in docs:
        result.append(doc.get('tag'))
    return result   
