import Vector2 from '../helpers/Vector2.js';
import APIResponse from '../helpers/response.js';
const thrusterNames = ['main', 'bow', 'clockwise', 'counterClockwise'];
export default class ThrusterController {
    constructor(parentShip) {
        this.thrusterPower = {
            mainThruster: 0,
            portRetroThruster: 0,
            starboardRetroThruster: 0,
            portForeThruster: 0,
            portAftThruster: 0,
            starboardForeThruster: 0,
            starboardAftThruster: 0,
        };
        this.parentShip = parentShip;
        const width = parentShip.size.x;
        const length = parentShip.size.y;
        // direction is direction of thrust
        this.thrusterData = {
            mainThruster: { offset: new Vector2(-length / 2, 0), direction: new Vector2(1, 0) },
            portRetroThruster: { offset: new Vector2((length * 2) / 5, -width / 4), direction: new Vector2(-1, 0) },
            starboardRetroThruster: { offset: new Vector2((length * 2) / 5, width / 4), direction: new Vector2(-1, 0) },
            portForeThruster: { offset: new Vector2((length * 2) / 5, -width / 4), direction: new Vector2(0, 1) },
            portAftThruster: { offset: new Vector2((-length * 2) / 5, -width / 4), direction: new Vector2(0, 1) },
            starboardForeThruster: { offset: new Vector2((length * 2) / 5, width / 4), direction: new Vector2(0, -1) },
            starboardAftThruster: { offset: new Vector2((-length * 2) / 5, width / 4), direction: new Vector2(0, -1) },
        };
    }
    // Successful responses contains a numeric field `power` giving the actually power the thruster was set to (in case power was out of bounds)
    // and a boolean field `powerLimited` indicating whether the power requested was greater than the MAX_POWER and thus reduced to equal MAX_POWER
    setThruster(thrusterName, power) {
        if (power < 0)
            return new APIResponse(400, ['power must be non-negative'], {}, false);
        const usedPower = Math.min(power, 100);
        switch (thrusterName) {
            case 'main':
                this.parentShip.accel = Vector2.right.rotateTo(this.parentShip.angle).scale(0.0001 * usedPower);
                break;
            case 'bow':
                this.parentShip.accel = Vector2.right.rotateTo(this.parentShip.angle).scale(-0.00005 * usedPower);
                break;
            case 'clockwise':
                this.parentShip.aAccel = 0.00004 * usedPower;
                break;
            case 'counterClockwise':
                this.parentShip.aAccel = -0.00004 * usedPower;
                break;
            default:
                return new APIResponse(400, [`Invalid thrusterName <${thrusterName}>`], {}, false);
        }
        return new APIResponse(200, [], { power: usedPower, powerLimited: power > 100 }, true);
    }
}
