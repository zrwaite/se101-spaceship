import Vector2 from "../helpers/Vector2.js";
import response from "../helpers/response.js";

// port left
// starboard right

const MAX_POWER = 100;
const LINEAR_SENSITIVITY = 5e-4;
const ANGULAR_SENSITIVITY = 5e-4;

export default class ThrusterController{
    constructor(parentShip){
		this.parentShip = parentShip;
		let width = parentShip.size.y;
		let length = parentShip.size.x;
		// direction is direction of thrust
		this.thrusterData = {
			mainThruster: { offset: new Vector2(-length / 2, 0), direction: new Vector2(1, 0) },
			portRetroThruster: { offset: new Vector2(length * 2 / 5, -width / 4), direction: new Vector2(-1, 0) },
			starboardRetroThruster: { offset: new Vector2(length * 2 / 5, width / 4), direction: new Vector2(-1, 0) },
			portForeThruster: { offset: new Vector2(length * 2 / 5, -width / 4), direction: new Vector2(0, 1) },
			portAftThruster: { offset: new Vector2(-length * 2 / 5, -width / 4), direction: new Vector2(0, 1) },
			starboardForeThruster: { offset: new Vector2(length * 2 / 5, width / 4), direction: new Vector2(0, -1) },
			starboardAftThruster: { offset: new Vector2(-length * 2 / 5, width / 4), direction: new Vector2(0, -1) }
		}
		this.thrusterPower = Object.fromEntries(Object.keys(this.thrusterData).map(thruster => [thruster, 0]));
	}
	// Successful responses contains a numeric field `power` giving the actualy pwoer the thruster was set to (in case power was out of bounds)
	// and a boolean field `powerLimited` indicating whether the power requested was greater than the MAX_POWER and thus reduced to equal MAX_POWER
	igniteThrusters(thrusterName, power){
		if (power < 0) {
			let errorMessage = "igniteThrusters failed as requested power must be non-negative";
			console.log(errorMessage);
			return new response(400, [errorMessage], {}, false);
		}
		if (!(thrusterName in this.thrusterPower)) {
			let errorMessage = "igniteThrusters failed as thruster name was not valid; expected one of the following: " + Object.keys(this.thrusterPower);
			console.log(errorMessage);
			return new response(400, [errorMessage], {}, false);
		}
		let powerLimited = power > MAX_POWER;
		power = Math.min(power, MAX_POWER);
		let deltaPower = power - this.thrusterPower[thrusterName];
		if (deltaPower == 0) {
			return;
		}
		this.thrusterPower[thrusterName] = power;
		// update physics
		let thrusterDatum = this.thrusterData[thrusterName];
		let offset = thrusterDatum.offset;
		let direction = thrusterDatum.direction;
		let deltaLinAccel = direction.scale(LINEAR_SENSITIVITY * deltaPower).scale(1 / this.parentShip.mass);
		let deltaAngAccel = new Vector2(0, ANGULAR_SENSITIVITY * deltaPower * offset.magnitude() * Math.sin(offset.angleTo(direction)) / this.parentShip.mass);
		this.parentShip.localAccel = this.parentShip.localAccel.add(deltaLinAccel);
		this.parentShip.aAccel = this.parentShip.aAccel.add(deltaAngAccel);
		console.log(this.parentShip.aAccel);
		return new response(200, [], { power: power, powerLimited: powerLimited }, true);
	}
}