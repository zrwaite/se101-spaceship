import Game from './game.js'
import Vector2 from './helpers/Vector2.js'
import RenderedObject from './renderedObject.js'
export default class Sprite extends RenderedObject {
	/* Default Attributes */
	speed = new Vector2(0, 0) //linear speed
	accel = new Vector2(0, 0) //linear acceleration
	maxSpeed = 1000 //Max linear speed
	aSpeed: number = 0 //angle speed
	aAccel: number = 0 //angle acceleration
	maxASpeed = 20 //Max angular speed
	radius = 10 // Object collision Radius
	mass = 1 //Object mass for collisions
	delete = false
	constructor(...args: [pos: Vector2, game: Game]) {
		super(...args)
	}
	update() {
		// All Simple Physics
		// Add accelerations to speeds:
		this.speed = this.speed.add(this.accel)
		this.aSpeed += this.aAccel
		// Add speeds to positions
		this.pos = this.pos.add(this.speed)
		this.angle = this.angle + this.aSpeed
		if (this.angle > Math.PI) this.angle = -2 * Math.PI + this.angle
		if (this.angle < -Math.PI) this.angle = 2 * Math.PI - this.angle
		this.boundsDetect() //Detect boundaries for position and speed
		// delete sprites that are heavily oob
		if (this.pos.x < -this.game.width || this.pos.x > 2 * this.game.width || this.pos.y < -this.game.height || this.pos.y > 2 * this.game.height) {
			this.delete = true
		}
	}
	boundsDetect() {
		// y speed bounds
		if (this.speed.y > this.maxSpeed) this.speed.y = this.maxSpeed
		// x speed bounds
		if (this.speed.x > this.maxSpeed) this.speed.x = this.maxSpeed
		// angle speed bounds
		if (this.aSpeed > this.maxASpeed) this.aSpeed = this.aSpeed = this.maxASpeed
	}
}
