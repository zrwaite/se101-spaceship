import { angleDiff } from '../helpers.js';
import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        // if no value for target is identified, do nothing
        if (!this.sensors.target)
            return;
        // angleDiff (current, desired) --> returns difference between current heading and desired heading
        const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading);
        // force (heading difff) --> returns the heading diff or 100 if the difference in heading is higher
        /*
            update function (set on a straight path)
        */
        const force = Math.min(Math.abs(1000 * headingDiff), 500);
        // turn function --> clockwise if headingDiff < 0 && counter-clockwise if headingDiff > 0
        setThruster('main', force);
        // if (headingDiff < 0){
        //     setThruster('clockwise', force)
        //     setThruster('counterClockwise', 0)
        // } else {
        //     setThruster('counterClockwise', force)
        //     setThruster('clockwise', 0)
        // }
        // setThruster('main', Math.abs(headingDiff) < 0.2 ? 30 : 0)
    }
}
