import { angleDiff } from "../helpers.js";
import PropulsionController from "../../src/subsystems/propulsionController.js";
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
        const angle = this.navigation.angle;
        const heading = this.sensors.target.heading;
        const headingDiff = angleDiff(angle, heading);
        const force = Math.min(Math.abs(400 * headingDiff), 100);
        if (headingDiff < 0) {
            setThruster("clockwise", force);
            //Adding countersteer.
            setThruster("counterClockwise", force / 3);
        }
        else {
            setThruster("counterClockwise", force);
            //Adding countersteer.
            setThruster("clockwise", force / 3);
        }
        //Rocket thrusts towards target within a greater range.
        setThruster("main", Math.abs(headingDiff) < 1 ? 40 : 0);
    }
}
