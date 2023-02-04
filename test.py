
from gtts import gTTS
import gtts.lang
import tkinter as tk
import tkinter.scrolledtext as tkst
import os
from pygame import mixer, _sdl2
import pyttsx3
import time


languages = gtts.lang.tts_langs()
num = 0
mixer.init() 
inputs = _sdl2.audio.get_audio_device_names(True)
outputs = _sdl2.audio.get_audio_device_names(False)
mixer.quit()

window = tk.Tk()
window.title("TTS Voice Chat")
frame = tk.Frame(master=window)
window.geometry("800x600")
mixer.init(devicename=outputs[1])
language = tk.StringVar()
entry = tkst.ScrolledText(frame,width=40,height=20)
entry.grid(row=0,column=0)

def play(filenumber):
    global octaves
    global num
    num = num + 1
    tts = gTTS(entry.get("1.0", tk.END),lang="zh-TW")
    tts.save("D:\Projects\VoiceMp4\output"+str(filenumber)+".mp3")
    mixer.music.load("D:\Projects\VoiceMp4\output"+str(filenumber)+".mp3")
    mixer.music.play()
    os.remove("D:\Projects\VoiceMp4\output"+str(filenumber)+".mp3")

button = tk.Button(frame,text="Play",width=10,height=5,command=lambda:play(num))
button.grid(row=0, column=1,padx=(50,0))
frame.pack()
window.mainloop()
mixer.quit()
os.remove("D:\Projects\VoiceMp4\output"+str(num)+".mp3")


