import { RProjectile } from "./requtils_modules/RProjectile.js";
import { RButton } from "./requtils_modules/RButton.js";
import { RText } from "./requtils_modules/RText.js";
import { RPlayer } from "./requtils_modules/RPlayer.js";
import { RLine } from "./requtils_modules/RLine.js";

let score = 0;

// Setting a new scene
const mainScene = new RScene();
R.setScene(mainScene);

const projectileTest = new RProjectile();
projectileTest.x = 0;
projectileTest.y = 0;
projectileTest.width = 0.5;
projectileTest.height = 0.5;
projectileTest.texture = "assets/images/projectile.png";
projectileTest.vector = [0.05, 0.05];
projectileTest.lifetime = 3000000;

const buttonTest = new RButton();
buttonTest.x = 1;
buttonTest.y = 1;
buttonTest.width = 1;
buttonTest.height = 1;
buttonTest.texture = "assets/images/1x1button.png";
buttonTest.callback = function () {
	for (let i = 0; i < 35; i++) {
		buttonProj = new RProjectile();
		buttonProj.x = buttonTest.x;
		buttonProj.y = buttonTest.y;
		buttonProj.width = 0.1;
		buttonProj.height = 0.1;
		buttonProj.texture = "assets/images/1x1button.png";
		buttonProj.lifetime = Math.random() * 400;
		buttonProj.vector = [(Math.random() - 0.5) / 5, (Math.random() - 0.5) / 5];
	}
	this.x = 1 + Math.random() * 14;
	this.y = 1 + Math.random() * 7;
	score = score + 1;
	textTest.text = `Score: ${score}`;
	R.playSound("assets/audio/click.wav");
};

const playerTest = new RPlayer();
playerTest.x = 7.5;
playerTest.y = 4;
playerTest.width = 1;
playerTest.height = 1;
playerTest.texture = "assets/images/player.png";
playerTest.speed = 0.1;
playerTest.hidden = false;
playerTest.relative = false;

const textTest = new RText("Score: 0");
textTest.size = 1;
textTest.x = 8;
textTest.y = 1;
textTest.anchored = true;

const textControls = new RText("WASD/Arrow Keys to move");
textControls.size = 1;
textControls.x = 8;
textControls.y = 2;
textControls.anchored = true;

const textTicks = new RText("");
textTicks.size = 0.5;
textTicks.x = 12;
textTicks.y = 1;
textTicks.anchored = true;

const textCollision = new RText("");
textCollision.size = 0.5;
textCollision.x = 8;
textCollision.y = 8.5;
textCollision.anchored = true;

const o = new RLine();
o.path = [[0, 0]];
o.width = 15;
o.cap = "round";

R.ontick = function (time) {
	textTicks.text = `${Math.round(time / 100) / 10}s`;
	textCollision.text = RImage.checkCollision(playerTest, buttonTest) ? "You are colliding with the button" : "You are not colliding with the button";
	if (projectileTest.x > 16 - projectileTest.width || projectileTest.x < 0) {
		projectileTest.vector = [-1.025 * projectileTest.vector[0], 1.025 * projectileTest.vector[1]];
	}
	if (projectileTest.y > 9 - projectileTest.height || projectileTest.y < 0) {
		projectileTest.vector = [1.025 * projectileTest.vector[0], -1.025 * projectileTest.vector[1]];
	}
	if (time > 5000) {
		R.delete(textControls);
	}
	o.path = [playerTest.center, buttonTest.center];
};
R.startGame(); // Starts game
