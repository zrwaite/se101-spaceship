import { angleDiff, withinPiRange } from '../helpers.js';
import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
        const headingDiff = withinPiRange(angleDiff(this.navigation.angle, this.sensors.target.heading));
        const force = 100;
        console.log(headingDiff);
        setThruster('main', force);
        if (headingDiff < 0 && Math.abs(headingDiff) >= 0.2) {
            setThruster('clockwise', force);
            setThruster('counterClockwise', 0);
        }
        else if (headingDiff > 0 && Math.abs(headingDiff) >= 0.2) {
            setThruster('counterClockwise', force);
            setThruster('clockwise', 0);
        }
        else {
            setThruster('counterClockwise', 0);
            setThruster('clockwise', 0);
        }
        setThruster('main', Math.abs(headingDiff) < 0.5 ? 200 : 0);
    }
}
