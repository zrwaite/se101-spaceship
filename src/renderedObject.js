class RenderedObject{
	constructor(pos, game) {
		this.game = game;
		this.pos = pos;
		this.image;
		this.height;
		this.width;
	}
	draw(ctx) {
		ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
	}
}	