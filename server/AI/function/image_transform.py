from multiprocessing import Pool

def apply_transformer(imgs, transformer, parallel=True):
    if parallel:
        pool = Pool()
        imgs_transform = pool.map(transformer, [img for img in imgs])
        pool.close()
        pool.join()
    else:
        imgs_transform = [transformer(img) for img in imgs]
    return imgs_transform