import { angleDiff } from '../helpers.js';
import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        //Student code goes here
        //slowing down to land
        if (!this.sensors.target)
            return;
        const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading);
        const force = Math.min(Math.abs(50 * headingDiff), 70);
        if (headingDiff < 0) {
            setThruster('clockwise', force);
            setThruster('counterClockwise', 0);
        }
        else {
            setThruster('counterClockwise', force);
            setThruster('clockwise', 0);
        }
        setThruster('main', Math.abs(headingDiff) < 0.20 ? 100 : 0);
    }
}
