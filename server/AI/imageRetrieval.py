
import os
import numpy as np
import tensorflow as tf
from sklearn.neighbors import NearestNeighbors
from urllib.request import urlopen
import cv2

from .function.transformer import ImageTransformer
from .function.image_transform import apply_transformer

#메인 모델
def model_predict(queryImage,img_url_list): #img_url_list=[{"id":"df" , "image_url":"http"}]
    parallel = True
    
    img_set=[]
    imgs_test=[]

    for data in img_url_list:
        img=urlopen(data["image_url"])
        image = np.asarray(bytearray(img.read()), dtype="uint8")
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        img_set.append(image)
        
    imgs_train = img_set

    image_test = urlopen(queryImage)
    image_test = np.asarray(bytearray(image_test.read()), dtype="uint8")
    image_test = cv2.imdecode(image_test, cv2.IMREAD_COLOR)
    imgs_test.append(image_test)

    #VGGNet 로딩
    shape_img = (100,100,3)
    model = tf.keras.applications.VGG19(weights='imagenet', include_top=False, input_shape=shape_img)

    shape_img_resize = tuple([int(x) for x in model.input.shape[1:]])
    input_shape_model = tuple([int(x) for x in model.input.shape[1:]])
    output_shape_model = tuple([int(x) for x in model.output.shape[1:]])
    n_epochs = None


    # 이미지 전처리
    transformer = ImageTransformer(shape_img_resize)
    imgs_train_transformed = apply_transformer(imgs_train, transformer, parallel=parallel)
    imgs_test_transformed = apply_transformer(imgs_test, transformer, parallel=parallel)

    # np 배열화
    X_train = np.array(imgs_train_transformed).reshape((-1,) + input_shape_model)
    X_test = np.array(imgs_test_transformed).reshape((-1,) + input_shape_model)

    # 임베딩
    E_train = model.predict(X_train)
    E_train_flatten = E_train.reshape((-1, np.prod(output_shape_model)))
    E_test = model.predict(X_test)
    E_test_flatten = E_test.reshape((-1, np.prod(output_shape_model)))

    # k-근접
    knn = NearestNeighbors(n_neighbors=len(imgs_train), metric="cosine")
    knn.fit(E_train_flatten)
    _, indices = knn.kneighbors(E_test_flatten)
    imgs_retrieval=[]
    for idx in indices.flatten():
        imgs_retrieval.append(img_url_list[idx])
    return imgs_retrieval