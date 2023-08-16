import uvicorn
import os
from fastapi import FastAPI 
from routers import test, hashtag
from models import mongoDB
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
#app.include_router(test.router)
app.include_router(hashtag.router)

#CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.get("/")
def root():
    return {"message": "Hello, insTAG!"}




