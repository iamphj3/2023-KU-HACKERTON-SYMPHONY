import os
import numpy as np
import tensorflow as tf
from urllib.request import urlopen
import cv2
from skimage.transform import resize
from PIL import Image
import base64
import io
#import skimage.io

import keras.utils as image
from keras.applications.vgg16 import preprocess_input

from .function.cos_sim import cos_sim

#메인 모델
def model_predict(queryImage,img_url_list): #img_url_list=[{"id":"df" , "image_url":"http"}]
    
    #메인 모델
    base_model = tf.keras.applications.VGG16(weights='imagenet')
    #base_model.summary()
    
    # Feature Map 추출 모델 생성
    model = tf.keras.models.Model(inputs = base_model.input,outputs = base_model.get_layer('block5_conv3').output)
    #model.summary()


    img_set=[]
    
    #이미지셋 전처리
    for data in img_url_list:
        img=urlopen(data["image_url"])
        image = np.asarray(bytearray(img.read()), dtype="uint8")
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        img_set.append(image)
        
    imgs_train = img_set
    
    #feature 저장할 리스트
    feature_map=[]
    for img in imgs_train:
        img = cv2.resize(img,dsize=(224,224))
        img = image.img_to_array(img)
        img = img.reshape((1, img.shape[0],img.shape[1],img.shape[2]))
        img = preprocess_input(img)
        # Feature Map 추출
        feature=model.predict(img)
        feature_map.append(feature)
    
    #image_test = urlopen(queryImage)
    #image_test = np.asarray(bytearray(image_test.read()), dtype="uint8")
    #image_test = cv2.imdecode(image_test, cv2.IMREAD_COLOR)

    #쿼리 이미지 전처리
    #base64_img
    imgdata = base64.b64decode(queryImage)
    dataBytesIO = io.BytesIO(imgdata)
    image = Image.open(dataBytesIO)
    image = image.resize((224, 224))
    test_image=cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)
    
    q_feature=[]
    
    q_img = cv2.resize(test_image,dsize=(224,224))
    q_img = image.img_to_array(q_img)
    q_img = q_img.reshape((1, q_img.shape[0],q_img.shape[1],q_img.shape[2]))
    q_img = preprocess_input(q_img)
    # Feature Map 추출
    q_feature=model.predict(q_img)

    #코사인 유사도
    similar={}
    i=0
    for img in feature_map:
        similarity= cos_sim(q_feature.flatten(),img.flatten())
        similar.setdefault(i,similarity)
        i+=1

    similar=sorted(similar.items(), key = lambda item: item[1], reverse=True)

    #유사도 순 정렬
    imgs_retrieval=[]
    
    for sim in similar:
        imgs_retrieval.append(img_url_list[sim[0]])
    
    return imgs_retrieval