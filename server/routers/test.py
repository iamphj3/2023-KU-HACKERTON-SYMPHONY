from os import environ
import time, json
from dotenv import load_dotenv
from instagrapi import Client
from instagrapi.types import Media 
from fastapi import APIRouter, Query
from typing import List
from models import get_db
from models.instagrapi_exceptions import handle_exception

from PIL import Image
import requests
from io import BytesIO

db = get_db()

router = APIRouter(
	prefix="/test",
    tags=["test"]
)

load_dotenv()
cl = Client()
cl.handle_exception = handle_exception

username = environ["PROXY_USER_NAME"]
pw = environ["PROXY_PASSWORD"]
proxy = f"https://{username}:{pw}@gate.smartproxy.com:10015"
cl.set_proxy(proxy)

#cl.login(environ["ACCOUNT_USERNAME"], environ["ACCOUNT_PASSWORD"])
#cl.dump_settings('./tmp/dump.json')

cl.load_settings('./tmp/dump.json')
cl.get_timeline_feed()

@router.get("/resize")
def resize_image(url):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    img = img.resize((500, 500),Image.LANCZOS)
    return img

@router.get("/list/v1")
def hashtag_list_v1(tag: str, amount: int):
    cl.set_proxy(proxy)
    start = time.time()
    medias = cl.hashtag_medias_top_v1(tag, amount=amount)
    print("amount"+str(amount)+" timetotal: ", time.time() - start)
    return medias[0].dict()

@router.get("/recent/v1")
def hashtag_list_v1(tag: str, amount: int):
    start = time.time()
    medias = cl.hashtag_medias_recent_v1(tag, amount=amount)
    print("amount"+str(amount)+" timetotal: ", time.time() - start)
    for i in range(amount):
        print(medias[i].dict()["taken_at"])
    return medias[0].dict()

@router.get("/recent")
def hashtag_list_v1(tag: str, amount: int):
    start = time.time()
    medias = cl.hashtag_medias_recent(tag, amount=amount)
    print("amount"+str(amount)+" timetotal: ", time.time() - start)
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
    #collection 합치기
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

    cursor = db["test"].aggregate(pipeline)
    duplicates = await cursor.to_list(length=None)
    print(duplicates)
    for doc in duplicates:
        print(doc["duplicates"])
        duplicate_ids = doc["duplicates"]
        del duplicate_ids[0]
        db["test"].delete_many({"_id": {"$in": duplicate_ids}})

