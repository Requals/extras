import random
import pathlib
import tkinter as tk
import time


def clipboardwords(amount):
    print(amount.get())
    random.seed(int(time.time_ns()/1000))
    direc = str(pathlib.Path(__file__).parent.resolve())
    f = open(direc+"\words.txt","r")
    wordslist = f.read().split("\n")
    sentencewords = []
    for i in range(amount.get()):
        sentencewords.append(wordslist[random.randint(0,len(wordslist))])
    #copy to clipboard
    textc = "\n".join(sentencewords)
    print(textc)

window = tk.Tk()
window.title("Utilities")
window.geometry("250x100")
slideramount = tk.IntVar()
slider = tk.Scale(from_=0,to=160,tickinterval=40,orient="horizontal",variable=slideramount)
clipboardbutton = tk.Button(text="Copy words to clipboard",command=lambda:clipboardwords(slideramount))
clipboardbutton.pack()
slider.pack()
window.mainloop()