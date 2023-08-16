from urllib.request import urlopen
import numpy as np
import cv2

def open_image(data):
        img=urlopen(data["image_url"])
        l_image = np.asarray(bytearray(img.read()), dtype="uint8")
        l_image = cv2.imdecode(l_image, cv2.IMREAD_COLOR)
        return l_image