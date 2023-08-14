import os
import numpy as np
import tensorflow as tf
from sklearn.neighbors import NearestNeighbors
import skimage.io
from multiprocessing import Pool
from skimage.transform import resize

def read_img(filePath):
    return skimage.io.imread(filePath, as_gray=False)

def read_imgs_dir(dirPath, extensions, parallel=True):
    args = [os.path.join(dirPath, filename)
            for filename in os.listdir(dirPath)
            if any(filename.lower().endswith(ext) for ext in extensions)]
    if parallel:
        pool = Pool()
        imgs = pool.map(read_img, args)
        pool.close()
        pool.join()
    else:
        imgs = [read_img(arg) for arg in args]
    return imgs

def save_img(filePath, img):
    skimage.io.imsave(filePath, img)
    

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

def model_result():
    modelName = "vgg16" 
    parallel = True

    # 데이터 경로
    dataTrainDir = os.path.join(os.getcwd(), "data", "train")
    dataTestDir = os.path.join(os.getcwd(), "data", "test")
    outDir = os.path.join(os.getcwd(), "output", modelName)
    if not os.path.exists(outDir):
        os.makedirs(outDir)

    #이미지 읽어오기
    extensions = [".jpg", ".jpeg"]
    imgs_train = read_imgs_dir(dataTrainDir, extensions, parallel=parallel)
    imgs_test = read_imgs_dir(dataTestDir, extensions, parallel=parallel)
    #shape_img = imgs_train[0].shape
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
    knn = NearestNeighbors(n_neighbors=10, metric="cosine")
    knn.fit(E_train_flatten)

    # 유사 이미지 추출
    imgs_retrieval=[]
    for i, emb_flatten in enumerate(E_test_flatten):
        _, indices = knn.kneighbors([emb_flatten])
        img_query = imgs_test[i]
        imgs_retrieval = [imgs_train[idx] for idx in indices.flatten()]
    return imgs_retrieval
