import Vector2 from '../helpers/Vector2.js'
import APIResponse from '../helpers/response.js'
import ColonyShip from './colonyShip.js'

// port left
// starboard right

const MAX_POWER = 10
const LINEAR_SENSITIVITY = 2e-5
const ANGULAR_SENSITIVITY = 5e-4

const thrusterNames = ['mainThruster', 'portRetroThruster', 'starboardRetroThruster', 'portForeThruster', 'portAftThruster', 'starboardForeThruster', 'starboardAftThruster'] as const
type ThrusterName = typeof thrusterNames[number]

interface setThrustersResponse extends APIResponse {
	response: { power?: number; powerLimited?: boolean }
}

export default class ThrusterController {
	parentShip: ColonyShip
	thrusterData
	thrusterPower = {
		mainThruster: 0,
		portRetroThruster: 0,
		starboardRetroThruster: 0,
		portForeThruster: 0,
		portAftThruster: 0,
		starboardForeThruster: 0,
		starboardAftThruster: 0,
	}
	constructor(parentShip: ColonyShip) {
		this.parentShip = parentShip
		const width = parentShip.size.x
		const length = parentShip.size.y
		// direction is direction of thrust
		this.thrusterData = {
			mainThruster: { offset: new Vector2(-length / 2, 0), direction: new Vector2(1, 0) },
			portRetroThruster: { offset: new Vector2((length * 2) / 5, -width / 4), direction: new Vector2(-1, 0) },
			starboardRetroThruster: { offset: new Vector2((length * 2) / 5, width / 4), direction: new Vector2(-1, 0) },
			portForeThruster: { offset: new Vector2((length * 2) / 5, -width / 4), direction: new Vector2(0, 1) },
			portAftThruster: { offset: new Vector2((-length * 2) / 5, -width / 4), direction: new Vector2(0, 1) },
			starboardForeThruster: { offset: new Vector2((length * 2) / 5, width / 4), direction: new Vector2(0, -1) },
			starboardAftThruster: { offset: new Vector2((-length * 2) / 5, width / 4), direction: new Vector2(0, -1) },
		}
	}
	// Successful responses contains a numeric field `power` giving the actually power the thruster was set to (in case power was out of bounds)
	// and a boolean field `powerLimited` indicating whether the power requested was greater than the MAX_POWER and thus reduced to equal MAX_POWER
	setThruster(thrusterName: ThrusterName, power: number): setThrustersResponse {
		if (!(power >= 0)) {
			const errorMessage = 'igniteThrusters failed as requested power must be non-negative'
			return new APIResponse(400, [errorMessage], {}, false)
		}
		if (!(thrusterName in this.thrusterPower)) {
			const errorMessage = 'igniteThrusters failed as thruster name was not valid; expected one of the following: ' + Object.keys(this.thrusterPower)
			return new APIResponse(400, [errorMessage], {}, false)
		}
		const powerLimited = power > MAX_POWER
		power = Math.min(power, MAX_POWER)
		const deltaPower = power - this.thrusterPower[thrusterName]
		this.thrusterPower[thrusterName] = power
		// update physics
		const thrusterDatum = this.thrusterData[thrusterName]
		const offset = thrusterDatum.offset
		const direction = thrusterDatum.direction
		const deltaLinAccel = direction.scale(LINEAR_SENSITIVITY * deltaPower).scale(1 / this.parentShip.mass)
		const deltaAngAccel = (ANGULAR_SENSITIVITY * deltaPower * offset.magnitude() * Math.sin(offset.angleTo(direction))) / this.parentShip.mass
		this.parentShip.localAccel = this.parentShip.localAccel.add(deltaLinAccel)
		this.parentShip.aAccel = this.parentShip.aAccel += deltaAngAccel
		return new APIResponse(200, [], { power: power, powerLimited: powerLimited }, true)
	}
}

export type { ThrusterName }

export type setThrustersType = (thrusterName: ThrusterName, power: number) => setThrustersResponse
