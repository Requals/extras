from math import *
import shutil
import pathlib
import glob
from PIL import Image

# Parent Folder
p = pathlib.Path(__file__).parent

# Generated Folder (where generated shirts go)
g = p / "generated"
# Clothing Folder for clothing templates
t = p / "resources" / "template" / "clothing"
# Memes Folder for images to put on shirt
m = p / "resources" / "memes"

for clothing in t.glob("*"):
    for image in m.glob("*"):
        file_name = image.name.replace(".png","")+clothing.name
        template_clothing = Image.open(clothing)
        clothing_image = template_clothing.copy()
        template_meme = Image.open(image)
        meme_image = template_meme.copy()
        clothing_image.paste(meme_image,(240,89),meme_image)
        clothing_image.save(g / file_name)


