import { angleDiff } from '../helpers.js';
import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    angleDiff(a, b) {
        return (a - b);
    }
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
<<<<<<< HEAD
        const headingDiff = this.angleDiff(this.navigation.angle, this.sensors.target.heading);
=======
        const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading);
>>>>>>> bb350808835c4f4da779e616bc1a6d77be546b67
        const force = Math.min(Math.abs(500 * headingDiff), 100);
        if (headingDiff < 0) {
            setThruster('clockwise', force);
            setThruster('counterClockwise', 0);
        }
        else {
            setThruster('counterClockwise', force);
            setThruster('clockwise', 0);
        }
        setThruster('main', Math.abs(headingDiff) < 0.2 ? 30 : 0);
    }
}
