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
        if (Math.abs(headingDiff) >= 0.2) {
            setThruster('clockwise', force);
        }
        setThruster('main', Math.abs(headingDiff) < 0.2 ? 100 : 0);
    }
}
