from fastapi import FastAPI
from AI import imageRetrieval

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello, insTAG!"}

@app.get("/hashtag")
def imageSearch():
    result=imageRetrieval()
    return {}