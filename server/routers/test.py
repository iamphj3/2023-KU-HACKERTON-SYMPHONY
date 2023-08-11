from os import environ
import time
from dotenv import load_dotenv
from instagrapi import Client 
from fastapi import APIRouter

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
