class RenderedObject{ //Base class for everything that gets drawn
	constructor(pos, game) {
		this.game = game;
		this.pos = pos;
		this.image;
		this.height;
		this.width;
		this.angle;
		this.ctx;
	}
	draw() {
		this.game.ctxList[this.ctx].drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
	}
}	