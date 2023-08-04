import uvicorn
import os
from fastapi import FastAPI 
from instagrapi import Client 
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

app = FastAPI()
 
cl = Client()
cl.load_settings('./tmp/dump.json')
#cl.login(os.environ["ACCOUNT_USERNAME"], os.environ["ACCOUNT_PASSWORD"])
#cl.login_by_sessionid(os.environ["SESSION_ID"])
#cl.dump_settings('./tmp/dump.json')
#cl.set_proxy("https://61.37.223.152:8080")
cl.get_timeline_feed()

@app.get("/")
def root():
    return {"message": "Hello, insTAG!"}

@app.get("/hashtag/list/v1")
def hashtag_list_v1():
    medias = cl.hashtag_medias_top_v1('도농역', amount=5)
    return medias[0].dict()

@app.get("/hashtag/list/a1")
def hashtag_list_a1():
    medias = cl.hashtag_medias_top_a1('도농역', amount=5)
    return medias[0].dict()


