import { angleDiff } from '../helpers.js';
import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        var _a, _b;
        if (!this.sensors.target)
            return;
        const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading);
        //const force = Math.abs(200*headingDiff)
        const force = Math.min(Math.abs(500 * headingDiff), 10);
        if (headingDiff < 0) {
            setThruster('clockwise', force);
            setThruster('counterClockwise', Math.abs(headingDiff) < 0.5 ? force - 1 : 0);
        }
        else {
            setThruster('counterClockwise', force);
            setThruster('clockwise', Math.abs(headingDiff) < 0.5 ? force - 1 : 0);
        }
        // setThruster('main', Math.abs(headingDiff) < 0.2 ? 50 : 10)
        setThruster('main', Math.abs(headingDiff) < 0.2 ? 10 * ((_b = (_a = this.navigation.target) === null || _a === void 0 ? void 0 : _a.magnitude()) !== null && _b !== void 0 ? _b : 0) : 0);
        //Thruster Speed
    }
}
