import uvicorn
import os
from fastapi import FastAPI 
from dotenv import load_dotenv
from routers import test

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

app = FastAPI()
app.include_router(test.router)
 

@app.get("/")
def root():
    return {"message": "Hello, insTAG!"}



