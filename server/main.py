import uvicorn
import os
from fastapi import FastAPI 
from routers import test, hashtag
from models import mongoDB

app = FastAPI()
#app.include_router(test.router)
app.include_router(hashtag.router)

# mongodb = mongoDB()
# @app.on_event("startup")
# def on_app_start():
# 	mongodb.connect()

# @app.on_event("shutdown")
# async def on_app_shutdown():
# 	mongodb.close()
    
@app.get("/")
def root():
    return {"message": "Hello, insTAG!"}



