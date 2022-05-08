import Vector2 from "./helpers/Vector2.js";

export default class RenderedObject{ //Base class for everything that gets drawn
	/* Constructor Params */
	game: any; 
	pos: Vector2;
	/* Default or Empty Attributes */
	size:Vector2 = new Vector2(1,1); //In units
	angle:Vector2 = new Vector2(1, 0);
	ctx: string = "";
	image:CanvasImageSource|null = null; // Actual DOM image

	constructor(pos:Vector2, game:any) {
		this.game = game;
		this.pos = pos;
	}
	draw () {
		if (!this.image) return;
		// Set the context's translation.
        let ctx:CanvasRenderingContext2D = this.game.contexts[this.ctx];
        ctx.setTransform(1, 0, 0, 1, (this.pos.x * this.game.unit - this.game.camera.x) * this.game.zoom, (this.pos.y * this.game.unit - this.game.camera.y) * this.game.zoom);
        if (this.angle.angle() !== 0) ctx.rotate(this.angle.angle());
        // Draw the image with a half-size offset, so that rotating works properly and the coordinate represent the center.
        ctx.drawImage(this.image,  -this.size.x * this.game.unit / 2 * this.game.zoom,  -this.size.y * this.game.unit / 2 * this.game.zoom, this.size.x * this.game.unit * this.game.zoom, this.size.y * this.game.unit * this.game.zoom);
	}

}