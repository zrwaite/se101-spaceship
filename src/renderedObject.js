import Vector2 from "./helpers/Vector2.js";

export default class RenderedObject{ //Base class for everything that gets drawn
	constructor(pos, game) {
		this.game = game;
		this.pos = pos;
		this.image; // Actual DOM image
		this.size = {x: 1, y: 1}; // In units
		this.angle = new Vector2(1, 0);
		this.ctx;
	}
	draw () {
		// Set the context's translation.
        let ctx = this.game.contexts[this.ctx];
        ctx.setTransform(1, 0, 0, 1, this.pos.x * this.game.unit, this.pos.y * this.game.unit);
        if (this.angle.angle() !== 0) {
            ctx.rotate(this.angle.angle());
        }
        // Draw the image with a half-size offset, so that rotating works properly and the coor represent the center.
        ctx.drawImage(this.image,  -this.size.x * this.game.unit / 2,  -this.size.y * this.game.unit / 2, this.size.x * this.game.unit, this.size.y * this.game.unit);
	}
}