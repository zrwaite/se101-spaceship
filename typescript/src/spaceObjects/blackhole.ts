import Vector2 from '../helpers/Vector2.js'
import Process from '../gameProcess.js'
import Game from '../game.js'
import Sprite from '../sprite.js'
import Planet from './planet.js'
import Torpedo from '../ship/torpedo.js'

export default class BlackHole extends Sprite {
	/* Default Params */
	mass
	ctx = 'planets'
	radius = 40
	orbitingPlanets:Planet[] = []

	/* Other attributes */
	process: Process | null = null
	constructor(...args: [pos: Vector2, game: Game]) {
		super(...args)
		this.image = this.game.images['blackhole']
		this.mass = Infinity
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

	update() {
		if (!this.process) return
	}
}
