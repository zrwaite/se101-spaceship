import { angleDiff } from '../helpers.js';
import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
        const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading);
        const force = Math.min(Math.abs(100 * headingDiff), 100);
        if (headingDiff < 0) {
            setThruster('clockwise', force);
            setThruster('counterClockwise', force / 2);
        }
        else {
            setThruster('counterClockwise', force);
            setThruster('clockwise', force / 2);
        }
        setThruster("main", Math.abs(headingDiff) < 0.1 ? 15000 : 100);
    }
}
