import PropulsionController from '../../src/subsystems/propulsionController.js';
import { angleDiff } from '../helpers.js';
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
        const headingDif = angleDiff(this.sensors.target.heading, this.sensors.target.heading);
        const force = Math.min(Math.abs(500 * headingDif), 100);
        if (headingDif < 0) {
            setThruster('clockwise', force);
            setThruster('counterClockwise', 0);
        }
        else {
            setThruster('counterClockwise', force);
            setThruster('clockwise', 0);
        }
        setThruster('main', Math.abs(headingDif) < 0.2 ? 30 : 0);
    }
}
