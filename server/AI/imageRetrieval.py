import os
import numpy as np
import tensorflow as tf
from sklearn.neighbors import NearestNeighbors
from multiprocessing import Pool
from skimage.transform import resize
from urllib.request import urlopen
import cv2

def apply_transformer(imgs, transformer, parallel=True):
    if parallel:
        pool = Pool()
        imgs_transform = pool.map(transformer, [img for img in imgs])
        pool.close()
        pool.join()
    else:
        imgs_transform = [transformer(img) for img in imgs]
    return imgs_transform

# Normalize
def normalize_img(img):
    return img / 255.

def resize_img(img, shape_resized):
    img_resized = resize(img, shape_resized,
                         anti_aliasing=True,
                         preserve_range=True)
    assert img_resized.shape == shape_resized
    return img_resized

def flatten_img(img):
    return img.flatten("C")

#메인 모델
def model_predict(queryImage,img_url_list): #img_url_list=[{"id":"df" , "image_url":"http"}]
    parallel = True
    
    img_set=[]
    for data in img_url_list:
        img=urlopen(data.image_url)
        image = np.asarray(bytearray(img.read()), dtype="uint8")
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
        img_set.append(image)
    
    imgs_train = img_set
    imgs_test = urlopen(queryImage).read()
    shape_img = (100,100,3)

    #VGGNet 로딩
    model = tf.keras.applications.VGG19(weights='imagenet', include_top=False, input_shape=shape_img)

    shape_img_resize = tuple([int(x) for x in model.input.shape[1:]])
    input_shape_model = tuple([int(x) for x in model.input.shape[1:]])
    output_shape_model = tuple([int(x) for x in model.output.shape[1:]])
    n_epochs = None


    # 이미지 전처리
    class ImageTransformer(object):

        def __init__(self, shape_resize):
            self.shape_resize = shape_resize

        def __call__(self, img):
            img_transformed = resize_img(img, self.shape_resize)
            img_transformed = normalize_img(img_transformed)
            return img_transformed

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
