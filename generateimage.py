from PIL import Image, ImageDraw
from math import *

imagecreated = Image.new("RGB",(1000,1000),color = "white")
imagecreated.save("testimage.png")

resx = 500
resy = 1000

def color(x,y):
    xn = x/resx
    yn = y/resy
    r = abs(cos(tau*(10*xn)**2))
    g = abs(sin(tau*(10*yn)**2))
    b = 0
    return((int(r*255),int(g*255),int(b*255)))

with Image.open("testimage.png") as image:
    d = ImageDraw.Draw(image)
    for x in range(resx):
        for y in range(resy):
            d.rectangle([x,y,x,y],fill=None,outline=color(x,y))
    image.save("testimage.png")

    