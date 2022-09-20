import { angleDiff, withinPiRange } from '../helpers.js';
import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
        const headingDiff = withinPiRange(angleDiff(this.navigation.angle, this.sensors.target.heading));
        const force = Math.min(100 * Math.abs(headingDiff), 10);
        console.log(headingDiff);
        setThruster('main', force);
        if (headingDiff < 0 && Math.abs(headingDiff) >= 0.5) {
            setThruster('clockwise', force);
            setThruster('counterClockwise', 0);
        }
        else if (headingDiff > 0 && Math.abs(headingDiff) >= 0.5) {
            setThruster('counterClockwise', force);
            setThruster('clockwise', 0);
        }
        else {
            setThruster('counterClockwise', 0);
            setThruster('clockwise', 0);
        }
        setThruster('main', Math.abs(headingDiff) < 0.5 ? 50 : 0);
    }
}
