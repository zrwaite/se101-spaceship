import { PassiveSensorReading } from './passiveSensorReading.js'
import APIResponse from '../helpers/response.js'
import Vector2 from '../helpers/Vector2.js'
import ColonyShip from './colonyShip.js'
import RenderedObject from '../renderedObject.js'
import Game from '../game.js'

interface passiveScanResponse extends APIResponse {
	response: PassiveSensorReading[]
}

export default class PassiveSensors extends RenderedObject {
	parentShip: ColonyShip
	ctx = 'ships'
	cooldown = 0
	constructor(parentShip: ColonyShip, game: Game) {
		super(parentShip.pos, game)
		this.parentShip = parentShip
		this.game = game
	}
	scan(): passiveScanResponse {
		this.parentShip.energyUsed += 10
		// Ensure solar system is initialized before performing scan
		if (!this.parentShip.solarSystem) return new APIResponse(400, ['Cannot perform PassiveSensors scan until solar system initialized'], [])
		if (this.cooldown) return new APIResponse(400, ['sensors are still on cooldown'], [])
		this.cooldown = 50
		// Note: angle must account for relative position of object to ship (not global position on board)
		// To find angle, find angle difference between the vector from ship to object & current ship heading
		// y coordinate is inverted due to the flipped board axis (greater y value indicates lower position)
		let readings: PassiveSensorReading[] = []
		for (const planet of this.parentShip.solarSystem.planets) {
			const angle = planet.pos.angleToPoint(this.parentShip.pos)
			const distance = planet.pos.distance(this.parentShip.pos)
			readings.push(new PassiveSensorReading(angle, planet.mass / distance))
		}

		for (const warpgate of this.parentShip.solarSystem.warpGates) {
			const angle = warpgate.pos.angleToPoint(this.parentShip.pos)
			const distance = warpgate.pos.distance(this.parentShip.pos)
			readings.push(new PassiveSensorReading(angle, warpgate.mass / distance))
		}

		return new APIResponse(200, [], readings, true)
	}
	draw() {
		if (!this.cooldown) return
		// Set the context's translation.
		const ctx: CanvasRenderingContext2D = this.game.contexts[this.ctx]
		ctx.setTransform(1, 0, 0, 1, ((this.pos.x / 10) * this.game.unit - this.game.camera.x) * this.game.zoom, ((this.pos.y / 10) * this.game.unit - this.game.camera.y) * this.game.zoom)
		ctx.fillStyle = `rgba(0, 0, 255, ${this.cooldown / 100})`
		ctx.lineWidth = 2
		const radius = (50 - this.cooldown) * 10
		ctx.beginPath()
		ctx.ellipse(0, 0, radius, radius, 0, 0, 2 * Math.PI)
		ctx.fill()
	}
	update() {
		if (this.cooldown > 0) this.cooldown -= 1
		else this.cooldown = 0
		this.pos = this.parentShip.pos
	}
}

export type passiveScanType = () => passiveScanResponse
