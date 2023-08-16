import uvicorn
import os
from fastapi import FastAPI 
from routers import test, hashtag,cors
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

image_url = "https://instagram.fcgr1-1.fna.fbcdn.net/v/t51.2885-15/358352286_254964953908521_6754279129910412972_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fcgr1-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=cWqZy9S1bmgAX-645uU&edm=AMKDjl4BAAAA&ccb=7-5&ig_cache_key=MzE0MjEzODI4ODI2NDI0MTA2OQ%3D%3D.2-ccb7-5&oh=00_AfChfM16K1sBq9XQvgyrlUK9RS7xBF5_1urhTn5vpL4_Iw&oe=64E27364&_nc_sid=472314"

# URL에서 이미지 다운로드 및 Base64 인코딩
base64_encoded_image = cors.url_to_base64(image_url)

if base64_encoded_image:
    print("Image successfully encoded to Base64.")
else:
    print("Failed to encode image to Base64.")



