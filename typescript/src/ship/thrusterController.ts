import Vector2 from '../helpers/Vector2.js'
import APIResponse from '../helpers/response.js'
import ColonyShip from './colonyShip.js'

const thrusterNames = ['main', 'bow', 'clockwise', 'counterClockwise'] as const
type ThrusterName = typeof thrusterNames[number]

interface setThrustersResponse extends APIResponse {
	response: { power?: number; powerLimited?: boolean }
}

export default class ThrusterController {
	parentShip: ColonyShip
	thrusterPower = {
		main: 0,
		bow: 0,
		clockwise: 0,
		counterClockwise: 0,
	}
	constructor(parentShip: ColonyShip) {
		this.parentShip = parentShip
		const width = parentShip.size.x
		const length = parentShip.size.y
		// direction is direction of thrust
	}
	// Successful responses contains a numeric field `power` giving the actually power the thruster was set to (in case power was out of bounds)
	// and a boolean field `powerLimited` indicating whether the power requested was greater than the MAX_POWER and thus reduced to equal MAX_POWER
	setThruster(thrusterName: ThrusterName, power: number): setThrustersResponse {
		if (power < 0) return new APIResponse(400, ['power must be non-negative'], {}, false)
		const usedPower = Math.min(power, 100)
		switch (thrusterName) {
			case 'main':
			case 'bow':
			case 'clockwise':
			case 'counterClockwise':
				this.thrusterPower[thrusterName] = usedPower
				break
			default:
				return new APIResponse(400, [`Invalid thrusterName <${thrusterName}>`], {}, false)
		}
		return new APIResponse(200, [], { power: usedPower, powerLimited: power > 100 }, true)
	}
	getAccel() {
		return {
			linear: Vector2.right.rotateTo(this.parentShip.angle).scale(0.0001 * this.thrusterPower.main + -0.00005 * this.thrusterPower.bow),
			angular: 0.00001 * this.thrusterPower.clockwise + -0.00001 * this.thrusterPower.counterClockwise,
		}
	}
}

export type { ThrusterName }

export type setThrustersType = (thrusterName: ThrusterName, power: number) => setThrustersResponse
