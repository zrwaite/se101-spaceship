import Game from './game.js'
import Vector2 from './helpers/Vector2.js'

export default abstract class RenderedObject {
	//Base class for everything that gets drawn
	/* Constructor Params */
	game: Game
	pos: Vector2
	/* Default or Empty Attributes */
	size: Vector2 = new Vector2(10, 10)
	angle: number = 0
	radius: number = 10
	ctx: string = ''
	image: CanvasImageSource | null = null // Actual DOM image

	constructor(pos: Vector2, game: Game) {
		this.game = game
		this.pos = pos
	}
	draw(name: string = '') {
		if (!this.image) return
		// Set the context's translation.
		let ctx: CanvasRenderingContext2D = this.game.contexts[this.ctx]
		ctx.setTransform(1, 0, 0, 1, ((this.pos.x / 10) * this.game.unit - this.game.camera.x) * this.game.zoom, ((this.pos.y / 10) * this.game.unit - this.game.camera.y) * this.game.zoom)
		if (this.angle !== 0) ctx.rotate(this.angle)
		// Draw the image with a half-size offset, so that rotating works properly and the coordinate represent the center.
		ctx.drawImage(
			this.image,
			((-(this.size.x / 10) * this.game.unit) / 2) * this.game.zoom,
			((-(this.size.y / 10) * this.game.unit) / 2) * this.game.zoom,
			(this.size.x / 10) * this.game.unit * this.game.zoom,
			(this.size.y / 10) * this.game.unit * this.game.zoom
		)
		if (name !== '') {
			ctx.fillStyle = 'white'
			ctx.fillText(
				name,
				((-(this.size.x / 10) * this.game.unit) / 2) * this.game.zoom,
				((-(this.size.y / 10) * this.game.unit) / 2) * this.game.zoom,
			)
		}
	}
	update() {}
}
