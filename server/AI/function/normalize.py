from skimage.transform import resize
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