from fastapi import FastAPI
from AI import imageRetrieval
from instagrapi.types import Media


app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello, insTAG!"}

@app.get("/hashtag/image")
async def imageSearch():
    res={}
    ImageUrl=""
    image_sets=""
    result=imageRetrieval(ImageUrl,image_sets)
    return {"data": res}