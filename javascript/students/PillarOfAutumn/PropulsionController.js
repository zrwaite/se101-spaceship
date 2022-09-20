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
        if (headingDiff != 0) {
            if (headingDiff < -0.3) {
                setThruster('clockwise', force);
                console.log("accelerating");
            }
            else if (headingDiff >= -0.3) {
                setThruster('counterClockwise', force);
                console.log("decelerating");
            }
        }
        setThruster('main', Math.abs(headingDiff) < 0.2 ? 100 : 0);
    }
}
