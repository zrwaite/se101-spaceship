import Vector2 from '../helpers/Vector2.js'
import Process from '../gameProcess.js'
import Game from '../game.js'
import Sprite from '../sprite.js'
import Planet from './planet.js'
import Torpedo from '../ship/torpedo.js'

export default class Star extends Sprite {
	/* Default Params */
	mass
	ctx = 'planets'
	initialRadius = 40
	radius = 40
	orbitingPlanets:Planet[] = []
	collapseCountdown = 0
	collapsing = false


	/* Other attributes */
	process: Process | null = null
	constructor(...args: [pos: Vector2, game: Game]) {
		super(...args)
		this.image = this.game.images['star']
		this.mass = (Math.PI * this.radius * this.radius * this.radius) / 10
		this.calcSize()
	}
	initialize(process: Process) {
		this.process = process
	}
	calcSize() {
		this.size = new Vector2(this.radius * 3, this.radius * 3)
	}
	addPlanet(planet: Planet) {
		this.orbitingPlanets.push(planet)
	}
	collapse(after: number) {
		this.collapsing = true
		this.collapseCountdown = 500 + after
	}
	update() {
		if (!this.process) return
		if (this.collapsing) {
			if (this.collapseCountdown <= 0) {
				this.delete = true
				const explosion = new Torpedo(Vector2.zero, this.pos, this.game)
				explosion.FRAMES_FOR_EXPLOSION = 162
				explosion.EXPLOSION_MAX_SCALE = 30
				explosion.explode()
				this.process.spawnDeletableObject(explosion)
				this.orbitingPlanets.forEach(planet => planet.leaveOrbit())
				return
			} else if (this.collapseCountdown <= 500) {
				this.radius = this.initialRadius * (-Math.pow(-this.collapseCountdown+500, 5)/Math.pow(500, 5) + 1)
				this.calcSize()
			}
			this.collapseCountdown--
		}
	}
}
