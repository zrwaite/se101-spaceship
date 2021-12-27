import Vector2 from "../helpers/Vector2.js";
import response from "../helpers/response.js";

// port left
// starboard right

const MAX_POWER = 1000;
const LINEAR_SENSITIVITY = 2e-5;
const ANGULAR_SENSITIVITY = 5e-4;

export default class ThrusterController{
    constructor(parentShip){
		this.parentShip = parentShip;
		const width = parentShip.size.y;
		const length = parentShip.size.x;
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
	// Successful responses contains a numeric field `power` giving the actualy power the thruster was set to (in case power was out of bounds)
	// and a boolean field `powerLimited` indicating whether the power requested was greater than the MAX_POWER and thus reduced to equal MAX_POWER
	setThruster(thrusterName, power){
		if (!(power >= 0)) {
			const errorMessage = "igniteThrusters failed as requested power must be non-negative";
			console.log(errorMessage);
			return new response(400, [errorMessage], {}, false);
		}
		if (!(thrusterName in this.thrusterPower)) {
			const errorMessage = "igniteThrusters failed as thruster name was not valid; expected one of the following: " + Object.keys(this.thrusterPower);
			console.log(errorMessage);
			return new response(400, [errorMessage], {}, false);
		}
		const powerLimited = power > MAX_POWER;
		power = Math.min(power, MAX_POWER);
		const deltaPower = power - this.thrusterPower[thrusterName];
		this.thrusterPower[thrusterName] = power;
		// update physics
		const thrusterDatum = this.thrusterData[thrusterName];
		const offset = thrusterDatum.offset;
		const direction = thrusterDatum.direction;
		const deltaLinAccel = direction.scale(LINEAR_SENSITIVITY * deltaPower).scale(1 / this.parentShip.mass);
		const deltaAngAccel = new Vector2(0, ANGULAR_SENSITIVITY * deltaPower * offset.magnitude() * Math.sin(offset.angleTo(direction)) / this.parentShip.mass);
		this.parentShip.localAccel = this.parentShip.localAccel.add(deltaLinAccel);
		this.parentShip.aAccel = this.parentShip.aAccel.add(deltaAngAccel);
		return new response(200, [], { power: power, powerLimited: powerLimited }, true);
	}
}