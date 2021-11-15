export default class RenderedObject{ //Base class for everything that gets drawn
	constructor(pos, game) {
		this.game = game;
		this.pos = pos;
		this.image; // Actual DOM image
		this.size = {x: 1, y: 1}; // In units
		this.angle;
		this.ctx;
	}
	draw () {
		// Set the context's translation.
        let ctx = this.game.contexts[this.ctx];
		console.log(this.game.unit);
        ctx.setTransform(1, 0, 0, 1, this.pos.x * this.game.unit, this.pos.y * this.game.unit);
        if (this.angle !== 0) {
            ctx.rotate(this.angle);
        }
		//console.log(this.image);
		//console.log(ctx);
        // Draw the image with a half-size offset, so that rotating works properly and the coor represent the center.
        ctx.drawImage(this.image,  -this.size.x / 2,  -this.size.y / 2, this.size.x, this.size.y);
	}
}