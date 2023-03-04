export { RButton };

class RButton extends RImage {
	static buttonList = [];

	constructor(x, y, width, height, texture, callback, enabled = true, opacity, hidden, anchored) {
		super(x, y, width, height, texture, hidden, anchored, opacity);
		this.callback = callback;
		this.enabled = enabled;
		RButton.buttonList.push(this);
	}

	checkButtonCollision(x, y) {
		if (this.hidden || !this.enabled) {
			return;
		}
		const checkBoolean = getProportionedPixels(this.x - GameVars.currentScene.x) <= x && getProportionedPixels(this.y - GameVars.currentScene.y) <= y && getProportionedPixels(this.y - GameVars.currentScene.y) + getProportionedPixels(this.height) >= y && getProportionedPixels(this.x - GameVars.currentScene.x) + getProportionedPixels(this.width) >= x;
		if (checkBoolean) {
			this.callback();
		}
	}
}

GameVars.canvas.addEventListener("click", function (event) {
	const x = event.offsetX;
	const y = event.offsetY;
	for (const button of GameVars.currentScene.sceneObjects.filter((object) => object instanceof RButton)) {
		button.checkButtonCollision(x, y);
	}
});
