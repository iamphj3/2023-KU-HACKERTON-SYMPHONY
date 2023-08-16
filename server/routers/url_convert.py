import requests
import base64

def url_to_base64(image_url):
    response = requests.get(image_url)
    if response.status_code == 200:
        image_content = response.content
        base64_encoded = base64.b64encode(image_content)
        #print("Image successfully encoded to Base64.")
        return base64_encoded.decode('utf-8')
    else:
        print("Failed to encode image to Base64.")
        return None





