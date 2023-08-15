# motor - MongoDB 용 비동기 python 라이브러리
from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine
from dotenv import load_dotenv
from os import environ

load_dotenv()

class mongoDB:
    def __init__(self):
        self.client = None
        self.client = None

    def connect(self):
        #self.client = AsyncIOMotorClient("mongodb://localhost:27017")
        self.client = AsyncIOMotorClient(environ['MONGODB_URL'])
        #self.engine = AIOEngine(client=self.client, database=environ['MONGODB_NAME'])
        print("DB 와 연결되었습니다.")
    
    def close(self):
        self.client.close()

def get_db():
    mongodb = mongoDB()
    mongodb.connect()
    return mongodb.client.insTAG
