import { angleDiff, withinPiRange } from '../helpers.js';
import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
        const headingDiff = withinPiRange(angleDiff(this.navigation.angle, this.sensors.target.heading));
        const force = 1;
        console.log(headingDiff);
        if (headingDiff < -0.3) {
            setThruster('clockwise', force);
        }
        else if (headingDiff > -0.3 && headingDiff < 0) {
            setThruster('clockwise', 0);
            setThruster('counterClockwise', force);
        }
        else if (headingDiff >= 0) {
            setThruster('counterClockwise', 0);
        }
        setThruster('main', Math.abs(headingDiff) < 0.08 ? 40 : 0);
    }
}
