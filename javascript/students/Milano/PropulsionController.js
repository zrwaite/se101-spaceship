import { angleDiff } from '../helpers.js';
import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    //hi
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
        const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading);
        const force = Math.min(Math.abs(100 * headingDiff), 100);
        if (headingDiff < 0) {
            setThruster('clockwise', force);
            setThruster('counterClockwise', 0);
        }
        else {
            setThruster('counterClockwise', force); //head
            setThruster('clockwise', 0); //another commment
        }
        setThruster('main', Math.abs(headingDiff) < 0.2 ? 30 : 0);
    }
}
