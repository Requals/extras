export { RText };

class RText extends RObject {
	static safeFonts = ["Arial", "Verdana", "Tahoma", "Trebuchet MS", "Times New Roman", "Georgia", "Garamond", "Courier New", "Brush Script MT"];

	constructor(text, size, x, y, color = "black", font = GameVars.defaultFont, opacity, align = "center", hidden, anchored) {
		super(x, y, hidden, anchored, opacity);
		this.text = text;
		this.size = R.validateSize(size);
		this.font = font;
		this.color = color;
		this.align = align;
	}

	draw(ctx) {
		const tempFont = ctx.font;
		const tempColor = ctx.fillStyle;
		const tempAlign = ctx.textAlign;
		const tempAlpha = ctx.globalAlpha;
		ctx.globalAlpha = this.opacity;
		ctx.font = `${getProportionedPixels(this.size)}px ${this.font}`;
		ctx.fillStyle = this.color;
		ctx.textAlign = this.align;
		ctx.fillText(this.text, getProportionedPixels(this.x), getProportionedPixels(this.y));
		ctx.font = tempFont;
		ctx.fillStyle = tempColor;
		ctx.textAlign = tempAlign;
		ctx.globalAlpha = tempAlpha;
	}
}
