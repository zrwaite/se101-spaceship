import RenderedObject from '../renderedObject.js'
import Vector2 from '../helpers/Vector2.js'
import PlanetComposition from './planetComposition.js'
import Process from '../gameProcess.js'
import Game from '../game.js'

export default class Planet extends RenderedObject {
	/* Default Params */
	mass: number
	ctx = 'planets'
	name: string
	radius: number

	/* Other attributes */
	process: Process | null = null
	composition
	constructor(planetName: string, radius: number, composition: PlanetComposition, ...args: [pos: Vector2, game: Game]) {
		super(...args)
		this.image = this.game.images[planetName] || this.game.images['planet1']
		this.name = planetName
		this.composition = composition
		this.mass = (Math.PI * radius * radius * radius) / 10
		this.size = new Vector2(radius * 3, radius * 3)
		this.radius = radius
	}
	initialize(process: Process) {
		this.process = process
	}
}
