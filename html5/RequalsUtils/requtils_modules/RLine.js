export { RLine };

class RLine extends RObject {
	constructor(width = 1, color = "black", cap = "square", joining = "miter", hidden, anchored, path = [], x, y) {
		super(hidden, anchored);
		this.width = width;
		this.color = color;
		this.cap = cap;
		this.joining = joining;
		this.path = path;
		this.x = x; // Do not use these properties, they are required for render() to work
		this.y = y; // Do not use these properties, they are required for render() to work
	}

	draw(ctx) {
		const tempColor = ctx.strokeStyle;
		const tempWidth = ctx.lineWidth;
		const tempCap = ctx.lineCap;
		const tempJoining = ctx.lineJoin;
		ctx.strokeStyle = this.color;
		ctx.lineWidth = this.width;
		ctx.lineCap = this.cap;
		ctx.lineJoin = this.joining;
		ctx.beginPath();
		for (const coords of this.path) {
			let dx = 0;
			let dy = 0;
			if (coords instanceof Point) {
				dx = getProportionedPixels(coords.x);
				dy = getProportionedPixels(coords.y);
				ctx.lineTo(dx, dy);
			} else if (coords.length === 2) {
				if (typeof coords[0] === "number" && typeof coords[1] === "number") {
					dx = getProportionedPixels(coords[0]);
					dy = getProportionedPixels(coords[1]);
					ctx.lineTo(dx, dy);
				} else {
					throw new Error("Coordinates must be numbers!");
				}
			} else {
				throw new Error("Coordinates must have 2 numbers!");
			}
		}
		ctx.stroke();
		ctx.strokeStyle = tempColor;
		ctx.lineWidth = tempWidth;
		ctx.lineCap = tempCap;
		ctx.lineJoin = tempJoining;
	}

	interpolate(line) {
		if (line.path.length != 2) {
			return new Point();
		} else {
			throw new Error("Interpolation of a line only allows lines with 2 points");
		}
	}
}
