import random
import math

#Takes random item from a list
def selectRandom(listTake):
	return listTake[math.floor(len(listTake)*random.random())]

#Generates empty dictionary and list to be added to
levelDict = {}
anglesGenerated = []


"""
REMEMBER TO SET THE DIRECTORY OR THIS WILL NOT WORK
"""

directory = "C:/example/generated.adofai"

"""
REMEMBER TO SET THE DIRECTORY OR THIS WILL NOT WORK
"""


#What angles will you allow?
anglesAllowed = [-270,-90,0,0,0,0,0,90,270]

#Easing enabled or nah?
easingEnabled = False

#Randomize level or do math?
randomLevel = False


#Easing list
if easingEnabled == True:
	easingRandom = selectRandom(["Linear","InSine","OutSine","InOutSine","InQuad","OutQuad","InOutQuad","InCubic","OutCubic","InOutCubic","InQuart","OutQuart","InOutQuart","InQuint","OutQuint","InOutQuint","InExpo","OutExpo","InOutExpo","InCirc","OutCirc","InOutCirc","InElastic","OutElastic","InOutElastic","InBack","OutBack","InOutBack","InBounce","OutBounce","InOutBounce","Flash","InFlash","OutFlash","InOutFlash","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear","Linear",])
else:
	easingRandom = "Linear" 


#Randomly selects angles from anglesAllowed
if randomLevel == True:
	for x in range(30+math.floor(200*random.random())):
		anglesGenerated.append(str(selectRandom(anglesAllowed)))
else:
	angleMod = 10*random.random()
	angleBase = 0
	for x in range(500):
		anglesGenerated.append(str(angleBase))
		angleBase = (angleBase + angleMod*x)%360

#Set angleData to the generated angles
levelDict["angleData"] = anglesGenerated
#Generate settings
levelDict["settings"] = {
	"version": 6, 
	"artist": "Silence", 
	"specialArtistType": "None", 
	"artistPermission": "", 
	"song": "There is no song", 
	"author": "No one.", 
	"separateCountdownTime": "Enabled", 
	"previewImage": "", 
	"previewIcon": "", 
	"previewIconColor": "003f52", 
	"previewSongStart": 0, 
	"previewSongDuration": 10, 
	"seizureWarning": "Disabled", 
	"levelDesc": "Randomly generated (ajim22)", 
	"levelTags": "", 
	"artistLinks": "", 
	"difficulty": 1, 
	"requiredMods": [] ,
	"songFilename": "", 
	"bpm": 50+math.floor(150*random.random()), 
	"volume": 100, 
	"offset": 0, 
	"pitch": 100, 
	"hitsound": selectRandom(["None","Hat","Kick","Sizzle","Chuck","ShakerLoud","Hammer","KickChroma","SnareAcoustic2","Sidestick","Stick","ReverbClack","Squareshot","PowerDown","PowerUp","KickHouse","KickRupture","HatHouse","SnareHouse","SnareVapor"]), 
	"hitsoundVolume": 50+math.floor(120*random.random()), 
	"countdownTicks": 2+math.floor(3*random.random()),
	"trackColorType": selectRandom(["Single","Stripes","Glow","Blink","Switch","Rainbow"]), 
	"trackColor": str(hex(math.floor(16777216*random.random())))[slice(2,None)],
	"secondaryTrackColor": str(hex(math.floor(16777216*random.random())))[slice(2,None)], 
	"trackColorAnimDuration": 1+math.floor(5*random.random()), 
	"trackColorPulse": "None", 
	"trackPulseLength": math.floor(20*random.random()), 
	"trackStyle": selectRandom(["Standard","Neon","NeonLight","Basic"]), 
	"trackAnimation": selectRandom(["None","Assemble","Assemble Far","Extend","Grow","Fade","Drop","Rise","Grow_Spin","None","None","None","None","None","None","None","None","None","None","None","None"]), 
	"beatsAhead": 1+math.floor(20*random.random()), 
	"trackDisappearAnimation": selectRandom(["None","Scatter","Scatter_Far","Retract","Shrink","Shrink_Spin","Fade","None","None","None","None","None","None","None","None","None","None","None","None","None","None",]), 
	"beatsBehind": 1+math.floor(20*random.random()),
	"backgroundColor": "000000", 
	"showDefaultBGIfNoImage": "Enabled", 
	"bgImage": "", 
	"bgImageColor": "ffffff", 
	"parallax": [100, 100], 
	"bgDisplayMode": "FitToScreen", 
	"lockRot": "Disabled", 
	"loopBG": "Disabled", 
	"unscaledSize": 100,
	"relativeTo": "Player", 
	"position": [0, 0], 
	"rotation": math.floor(360*random.random()), 
	"zoom": 50+math.floor(150*random.random()),
	"bgVideo": "", 
	"loopVideo": "Disabled", 
	"vidOffset": 0, 
	"floorIconOutlines": "Disabled", 
	"stickToFloors": "Disabled", 
	"planetEase": easingRandom, 
	"planetEaseParts": 1+math.floor(4*random.random()), 
	"customClass": "",
	"legacyFlash": "False" ,
	"legacySpriteTiles": "False" 
}
#Add actions key of empty list to satisfy ADOFAI file
levelDict["actions"] = []
#Write an ADOFAI file and replace incompatible dictionary notation for ADOFAI file
#Change the file location to where you want the generated level to be
with open(directory,"w") as file:
    file.write(str(levelDict).replace("\'","\"").replace("\"False\"","false").replace(",",",\n"))
