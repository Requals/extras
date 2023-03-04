export { RPlayer };

class RPlayer extends RImage {
	constructor(x, y, width, height, texture, speed = 0.1, opacity, hidden, relative = false) {
		if (GameVars.currentScene.sceneObjects.filter((object) => object instanceof RPlayer)[0]) {
			console.error("A scene can't have multiple players!");
		}

		super(x, y, width, height, texture, hidden, opacity);
		this.texture = texture;
		this.speed = speed;
		this.relative = relative;
	}
}
