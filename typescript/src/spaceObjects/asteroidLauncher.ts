import Asteroid from './asteroid.js'
import Vector2 from '../helpers/Vector2.js'
import Process from '../gameProcess.js'
import Game from '../game.js'
import { withinPiRange } from '../helpers/Angles.js'

const FRAMES_PER_SECOND = 60

export default class AsteroidLauncher {
	/* Attributes */
	game
	process: Process | null = null
	spawnPeriod
	random: boolean
	angle: number
	currentDelay = 0
	speed: number
	pos: Vector2
	constructor(game: Game, pos: Vector2, aimTo: Vector2, random = false, spawnPeriod = 4, speed: number = 0.75) {
		this.game = game
		this.pos = pos
		this.random = random
		this.speed = speed
		if (this.pos.x > -10 && this.pos.x < this.game.width + 10 && this.pos.y > -10 && this.pos.y < this.game.height + 10) {
			throw Error(`Can't build asteroid launcher within map, that is buggy, and instead of solving it I just say we don't allow the bug. Pos: ${pos.x}, ${pos.y}`)
		}
		if (this.pos.x < -this.game.width || this.pos.x > 2 * this.game.width || this.pos.y < -this.game.height || this.pos.y > 2 * this.game.height) {
			throw Error(`Can't build asteroid launcher too far out of the map, asteroids will not spawn. Pos: ${this.pos.x}, ${this.pos.y}`)
		}
		if (!(aimTo.x > 0 && aimTo.x < this.game.width && aimTo.y > 0 && aimTo.y < this.game.height)) {
			throw Error(`Must aim within map. Current Aim: ${aimTo.x}, ${aimTo.y}`)
		}
		this.spawnPeriod = spawnPeriod * FRAMES_PER_SECOND + (this.random ? Math.random() -0.5 : 0)
		// Expects positive radians values... rotation == -1 denotes random angle
		this.angle = this.pos.angleToPoint(aimTo)
	}
	initialize(process: Process) {
		this.process = process
	}

	launchAsteroid() {
		const speed = this.random ? Math.random() * 2 * this.speed : this.speed // random speed
		const angle = this.random ? withinPiRange(this.angle + Math.random() - 0.5) : this.angle
		const velocity = Vector2.right.rotate(angle).scale(speed) // random direction
		let asteroid = new Asteroid(velocity, this.pos, this.game)
		if (this.process) {
			asteroid.initialize(this.process)
			this.process.spawnDeletableObject(asteroid)
		} else throw Error('This.process is not defined')
	}

	update() {
		if (this.currentDelay > this.spawnPeriod) {
			this.launchAsteroid()
			this.currentDelay = 0
		} else {
			this.currentDelay++
		}
	}
}
