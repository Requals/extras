export { RProjectile };

class RProjectile extends RImage {
	constructor(x, y, width, height, texture, vector = [1, 1], lifetime = 30000, opacity, hidden, anchored /* why do you need to anchor a projectile??? */) {
		super(x, y, width, height, texture, hidden, anchored, opacity);
		this.vector = vector;
		this.lifetime = lifetime;
	}

	update(vector = this.vector) {
		this.x = this.x + vector[0];
		this.y = this.y + vector[1];
	}
}
