/*
**************************************
requals.github.io is the best website!
**************************************
*/

// *************************
//
// GAME VARIABLE DEFINITIONS
//
// *************************

const GameVars = {};

GameVars.gameTitle = "Requals Utils Example";
GameVars.defaultScene = 1;
GameVars.defaultBackground = "assets/images/tempBackground.png";
GameVars.defaultFont = "Trebuchet MS";
GameVars.time = 0;
GameVars.aspectRatio = {
	width: 16,
	height: 9
};
GameVars.canvas = document.querySelector("#canvas");
GameVars.ctx = GameVars.canvas.getContext("2d");
GameVars.keys = {
	w: 0,
	a: 1,
	s: 2,
	d: 3,
	arrowup: 0,
	arrowleft: 1,
	arrowdown: 2,
	arrowright: 3
};
GameVars.controls = [false, false, false, false];
GameVars.resolution = {};
GameVars.currentScene = {};

// When a key is pressed check if it exists in the keys dictionary and then set it to true if so
document.addEventListener("keydown", function (event) {
	if (typeof GameVars.keys[event.key.toLowerCase()] !== "number") {
		return;
	}

	GameVars.controls[GameVars.keys[event.key.toLowerCase()]] = true;
});

// When a key is released check if it exists in the keys dictionary and then set it to false if so
document.addEventListener("keyup", function (event) {
	if (typeof GameVars.keys[event.key.toLowerCase()] !== "number") {
		return;
	}

	GameVars.controls[GameVars.keys[event.key.toLowerCase()]] = false;
});

// When the site is no longer visible release all keys
document.addEventListener("visibilitychange", function () {
	GameVars.controls = [false, false, false, false];
});

// When the document is right clicked disable the context menu
document.addEventListener(
	"contextmenu",
	function (event) {
		event.preventDefault();
	},
	false
);

// **************
//
// R GAME OBJECTS
//
// **************

class R {
	static ontick(time) {}

	static validateSize(n) {
		if (n >= 0 && !isNaN(n)) {
			return 0;
		}
		return n;
	}

	// Sets the current scene
	static setScene(scene) {
		GameVars.currentScene = scene;
	}

	// Deletes the object from sceneObjects
	static delete(tbr) {
		GameVars.currentScene.sceneObjects = GameVars.currentScene.sceneObjects.filter((object) => object !== tbr);
	}

	// Starts the game
	// TODO: add more comments within
	static startGame() {
		console.log("Start game");
		let currentTime = 0;
		let step = 0;
		const title = document.querySelector("title");

		window.onload = function () {
			function update(time) {
				step = step + 1;
				const scenePlayer = GameVars.currentScene.sceneObjects.filter((object) => object.constructor.name === "RPlayer")[0];
				const fixHz = 60 / (1000 / (time - currentTime));

				if (scenePlayer) {
					// If a player exists, run this
					if (scenePlayer.relative) {
						GameVars.currentScene.x = GameVars.currentScene.x + (GameVars.controls[3] - GameVars.controls[1]) * (GameVars.controls[2] || GameVars.controls[0] ? Math.SQRT1_2 : 1) * scenePlayer.speed * fixHz;
						GameVars.currentScene.y = GameVars.currentScene.y + (GameVars.controls[2] - GameVars.controls[0]) * (GameVars.controls[3] || GameVars.controls[1] ? Math.SQRT1_2 : 1) * scenePlayer.speed * fixHz;
					} else {
						scenePlayer.x = clamp(scenePlayer.x + (GameVars.controls[3] - GameVars.controls[1]) * (GameVars.controls[2] || GameVars.controls[0] ? Math.SQRT1_2 : 1) * scenePlayer.speed * fixHz, 0, GameVars.aspectRatio.width - scenePlayer.width);
						scenePlayer.y = clamp(scenePlayer.y + (GameVars.controls[2] - GameVars.controls[0]) * (GameVars.controls[3] || GameVars.controls[1] ? Math.SQRT1_2 : 1) * scenePlayer.speed * fixHz, 0, GameVars.aspectRatio.height - scenePlayer.height);
					}
				}
				for (const proj of GameVars.currentScene.sceneObjects.filter((object) => object.constructor.name === "RProjectile")) {
					proj.update([proj.vector[0] * fixHz, proj.vector[1] * fixHz]);
					proj.lifetime = proj.lifetime - (time - currentTime);

					if (proj.lifetime <= 0) {
						R.delete(proj);
					}
				}

				// put code here

				R.ontick(currentTime);
				resizeCanvas();

				if (!(step % 4)) {
					document.getElementById("fpscounter").innerHTML = Math.round(1000 / (time - currentTime));
				}

				currentTime = time;
				window.requestAnimationFrame(update);
			}
			window.requestAnimationFrame(update);

			title.innerHTML = GameVars.gameTitle;
		};
	}
}

// A point in space that is drawn
class RObject {
	constructor(hidden = false, anchored = false) {
		this.hidden = hidden;
		this.anchored = anchored;
		GameVars.currentScene.sceneObjects.push(this);
	}

	hide() {
		this.hidden = true;
	}

	show() {
		this.hidden = false;
	}

	draw() {}
}

// A container of objects (Currently unused, will be used for menu items etc. scrolling)
class RContainer {
	constructor(containerObjects) {
		this.containerObjects = containerObjects;
	}
}

// An image
class RImage extends RObject {
	constructor(x, y, width, height, texture = "green", opacity = 1, image, hidden, anchored) {
		super(hidden, anchored);
		this.x = x;
		this.y = y;
		this.width = R.validateSize(width);
		this.height = R.validateSize(height);
		this.texture = texture;
		this.opacity = opacity;
		this.image = image;
	}

	draw(ctx) {
		const tempAlpha = ctx.globalAlpha;
		ctx.globalAlpha = this.opacity;
		if (this.image) {
			ctx.drawImage(this.image, 0, 0, this.image.naturalWidth, this.image.naturalHeight, getProportionedPixels(this.x), getProportionedPixels(this.y), getProportionedPixels(this.width), getProportionedPixels(this.height));
		} else {
			if (this.texture.includes("assets/images")) {
				const newImageTest = new Image(getProportionedPixels(this.width), getProportionedPixels(this.height));
				newImageTest.src = this.texture;
				this.image = newImageTest;
			} else {
				const tempColor = ctx.fillStyle;
				ctx.fillStyle = this.texture;
				ctx.fillRect(getProportionedPixels(this.x), getProportionedPixels(this.y), getProportionedPixels(this.width), getProportionedPixels(this.height));
				ctx.fillStyle = tempColor;
			}
		}
		ctx.globalAlpha = tempAlpha;
	}

	static checkCollision(imagea, imageb) {
		return GameVars.currentScene.sceneObjects.includes(imagea) && GameVars.currentScene.sceneObjects.includes(imageb) && imagea.x < imageb.x + imageb.width && imagea.x + imagea.width > imageb.x && imagea.y < imageb.y + imageb.height && imagea.height + imagea.y > imageb.y;
	}

	get center() {
		return new Point(this.x + this.width / 2, this.y + this.height / 2);
	}
}

// A scene that contains objects and a background
class RScene extends RContainer {
	static sceneList = [];

	constructor(sceneObjects = [], background = GameVars.defaultBackground, x = 0, y = 0, game = false, backgroundImage) {
		super();
		this.sceneObjects = sceneObjects; // list of scene objects etc. text, buttons
		this.background = background; // image link to a background
		this.game = game;
		this.x = x;
		this.y = y;
		this.backgroundImage = backgroundImage;
		RScene.sceneList.push(this);
	}

	render(ctx) {
		if (!this.backgroundImage) {
			const background = new Image(GameVars.resolution.width, GameVars.resolution.height);
			background.src = this.background;
			this.backgroundImage = background;
		}
		ctx.drawImage(this.backgroundImage, 0, 0, 1280, 720, 0, 0, GameVars.resolution.width, GameVars.resolution.height);
		for (const object of GameVars.currentScene.sceneObjects) {
			if ((!(object instanceof RPlayer) && !object.anchored && (object.x - this.x > GameVars.aspectRatio.width || object.y - this.y > GameVars.aspectRatio.height || object.x - this.x + (object.width || 0) < 0 || object.y - this.y + (object.height || 0) < 0)) || object.hidden) {
				continue;
			}

			if (!(object instanceof RPlayer) && !object.anchored) {
				object.x -= this.x;
				object.y -= this.y;
			}

			object.draw(ctx);

			if (!(object instanceof RPlayer) && !object.anchored) {
				object.x += this.x;
				object.y += this.y;
			}
		}
	}
}

// **************
//
// MATH UTILITIES
//
// **************

// A point in space (Math)
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

// Functions

function clamp(number, min, max) {
	return Math.max(Math.min(number, max), min);
}
function getProportionedPixels(amount) {
	// Proportions to pixels
	if (isNaN(amount)) {
		throw new Error("Parameter is not a number!");
	}
	return Math.floor((GameVars.resolution.height * amount) / Math.min(GameVars.aspectRatio.width, GameVars.aspectRatio.height));
}
function resizeCanvas() {
	GameVars.resolution = {
		width: window.innerWidth / window.innerHeight <= GameVars.aspectRatio.width / GameVars.aspectRatio.height ? window.innerWidth : window.innerHeight * (GameVars.aspectRatio.width / GameVars.aspectRatio.height),
		height: window.innerWidth / window.innerHeight <= GameVars.aspectRatio.width / GameVars.aspectRatio.height ? window.innerWidth * (GameVars.aspectRatio.height / GameVars.aspectRatio.width) : window.innerHeight // Most readable JavaScript
	};
	GameVars.canvas.width = GameVars.resolution.width;
	GameVars.canvas.height = GameVars.resolution.height;
	GameVars.currentScene.render(GameVars.ctx);
}
