import time
from instagrapi import Client 
from fastapi import APIRouter

router = APIRouter(
	prefix="/test",
    tags=["test"]
)

cl = Client()
cl.load_settings('./tmp/dump.json')
#cl.login(os.environ["ACCOUNT_USERNAME"], os.environ["ACCOUNT_PASSWORD"])
#cl.login_by_sessionid(os.environ["SESSION_ID"])
#cl.dump_settings('./tmp/dump.json')
#cl.set_proxy("https://61.37.223.152:8080")
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
