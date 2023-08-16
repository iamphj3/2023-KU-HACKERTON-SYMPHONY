import requests
import base64

def url_to_base64(image_url):
    response = requests.get(image_url)
    if response.status_code == 200:
        image_content = response.content
        base64_encoded = base64.b64encode(image_content)
        return base64_encoded.decode('utf-8')
    else:
        return None

# 이미지 URL
image_url = "https://instagram.fcgr1-1.fna.fbcdn.net/v/t51.2885-15/358352286_254964953908521_6754279129910412972_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=instagram.fcgr1-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=cWqZy9S1bmgAX-645uU&edm=AMKDjl4BAAAA&ccb=7-5&ig_cache_key=MzE0MjEzODI4ODI2NDI0MTA2OQ%3D%3D.2-ccb7-5&oh=00_AfChfM16K1sBq9XQvgyrlUK9RS7xBF5_1urhTn5vpL4_Iw&oe=64E27364&_nc_sid=472314"

# URL에서 이미지 다운로드 및 Base64 인코딩
base64_encoded_image = url_to_base64(image_url)

if base64_encoded_image:
    print("Image successfully encoded to Base64.")
else:
    print("Failed to encode image to Base64.")




