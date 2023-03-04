import keyboard
import mouse
import time
import threading
def clicking():
    while True:
        mouse.click(button='left')
        time.sleep(0.1)
def moving():
    keys = ["w","d","s","a"]
    interval = 7.5
    while True:
        for key in keys:
            keyboard.press(key)
            time.sleep(interval)
            keyboard.release(key)
o = threading.Thread(target=clicking)
o.start()
q = threading.Thread(target=moving)
q.start()

