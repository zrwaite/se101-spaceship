import Game from '../game.js'
import Process from '../gameProcess.js'
import Vector2 from '../helpers/Vector2.js'

import RenderedObject from '../renderedObject.js'
import ColonyShip from '../ship/colonyShip.js'
import SolarSystem from '../solarSystem.js'
export default class WarpGate extends RenderedObject {
	/* Constructor params */
	destinationSolarSystem
	/* Default Attributes */
	ctx = 'planets'
	size = new Vector2(50, 50)
	radius = 15
	mass = 5
	gravitySignature = 1
	/* Other attributes */
	process: Process | null = null

	constructor(destinationSolarystem: string, ...args: [pos: Vector2, game: Game]) {
		super(...args)
		this.image = this.game.images['warpgate']
		this.destinationSolarSystem = destinationSolarystem
	}
	initialize(process: Process) {
		this.process = process
	}
	warp(ship: ColonyShip) {
		let newProcess: Process | undefined = this.game.processes.find((process) => process.solarSystem.name === this.destinationSolarSystem)
		if (newProcess) {
			ship.solarSystem = newProcess.solarSystem
			newProcess.appendShip(ship)
			ship.process.dealocateShip(ship)
			if (ship.primary) {
				this.game.drawnProcess = newProcess
				// newProcess.rerenderStatic();
			}
			ship.process = newProcess
		} else throw Error('Process not found')
	}
}
