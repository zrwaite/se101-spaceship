import Game from '../game.js'
import Process from '../gameProcess.js'
import Vector2 from '../helpers/Vector2.js'

import ColonyShip from '../ship/colonyShip.js'
import { SolarSystemName } from '../galaxies/solarSystem.js'
import Sprite from '../sprite.js'
import { keepInMap } from '../helpers/pos.js'
import { withinPiRange } from '../helpers/Angles.js'
export default class WarpGate extends Sprite {
	/* Constructor params */
	destinationSolarSystem
	/* Default Attributes */
	ctx = 'planets'
	size = new Vector2(50, 50)
	radius = 15
	mass = -100
	fourthDimension = false
	/* Other attributes */
	process: Process | null = null

	constructor(destinationSolarystem: SolarSystemName, ...args: [pos: Vector2, game: Game]) {
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
				newProcess.activate()
				this.game.drawnProcess = newProcess
				// newProcess.rerenderStatic();
			}
			ship.process = newProcess
		} else throw Error('Process not found')
	}
	update() {
		if (this.fourthDimension) {
			this.angle += Math.random()
			this.accel = Vector2.right.rotateTo(this.angle).scale(0.1)
			if (keepInMap(this.pos)) {
				this.angle = withinPiRange(this.pos.angleToPoint(new Vector2(360, 270)))
				this.speed = Vector2.zero
			}	
			super.update()
		}
	}
}
