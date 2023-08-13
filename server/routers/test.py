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
	prefix="/test",
    tags=["test"]
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


@router.get("/list/v1")
def hashtag_list_v1(tag: str, amount: int):
    start = time.time()
    medias = cl.hashtag_medias_top_v1(tag, amount=amount)
    print(medias[0])
    print(medias)
    print("amount"+str(amount)+" timetotal: ", time.time() - start)
    print(type(medias))
    return medias[0].dict()

@router.get("/list/a1")
def hashtag_list_a1(tag: str, amount: int):
    start = time.time()
    medias = cl.hashtag_medias_top_a1(tag, amount=amount)
    print("amount"+str(amount)+" timetotal: ", time.time() - start)
    return medias[0].dict()

@router.post("/create")
async def create_test():
    result = await db["temp"].insert_one({"test":"test"})
    print(result)

@router.post("/list/create")
async def create_v1(tag: str, amount: int):
    start = time.time()
    medias = cl.hashtag_medias_top_v1(tag, amount=amount)
    new_data = []
    for media in medias:
        mtemp = json.dumps(media.__dict__, default=str)
        new_data.append(json.loads(mtemp))
    result = await db["temp"].insert_many(new_data)
    print("amount"+str(amount)+" timetotal: ", time.time() - start)
    return result

@router.get("/user")
async def get_user():
    cursor = db["temp"].find()
    return cursor.to_list()

@router.post("/union")
async def test_union(hashtags : List[str] = Query(None)):
    pipeline = []
    for idx, tag in enumerate(hashtags):
        if(idx!=0):
            pipeline.append({
                "$unionWith":{
                    "coll": tag
                }
            })
    pipeline.append({"$out":"test"})
    cursor = db[hashtags[0]].aggregate(pipeline)
    await cursor.to_list(length=None)

    #중복 제거
    pipeline2 = [
        {
            "$group": {
                "_id": "$pk",  # 중복을 확인하려는 필드로 수정
                "count": {"$sum": 1},
                "duplicates": {"$addToSet": "$_id"}
            }
        },
        {
            "$match": {
                "count": {"$gt": 1}
            }
        }
    ]

    cursor = db["test"].aggregate(pipeline2)
    duplicates = await cursor.to_list(length=None)
    print(duplicates)
    for doc in duplicates:
        print(doc["duplicates"])
        duplicate_ids = doc["duplicates"]
        del duplicate_ids[0]
        db["test"].delete_many({"_id": {"$in": duplicate_ids}})

    #pipeline.append({"$group":{"_id":"$pk"}})
    #print(pipeline)
    #cursor = db[hashtags[0]].aggregate(pipeline)
    #result = await cursor.to_list(length=None)
    #print(result)

