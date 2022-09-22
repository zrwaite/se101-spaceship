import { angleDiff } from "../helpers.js";
import PropulsionController from "../../src/subsystems/propulsionController.js";
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        //Student code goes here
        if (!this.sensors.target)
            return;
        const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading);
        const force = Math.min(Math.abs(500 * headingDiff), 100);
        if (headingDiff < 0) {
            setThruster("clockwise", force - this.navigation.angVel * 15000);
            setThruster("counterClockwise", this.navigation.angVel);
        }
        else {
            setThruster("counterClockwise", this.navigation.angVel * 15000);
            setThruster("clockwise", this.navigation.angVel);
        }
        if (this.sensors.targetDetails &&
            ((this.sensors.targetDetails.distance < 200 &&
                this.navigation.speed > 0.25) ||
                (this.sensors.targetDetails.distance < 100 &&
                    this.navigation.speed > 0.125))) {
            setThruster("main", 0);
            setThruster("bow", 100);
        }
        else {
            setThruster("bow", 0);
            setThruster("main", Math.abs(headingDiff) < 0.2 &&
                (this.navigation.speed < 1 || headingDiff > 0.001)
                ? 30
                : 0);
        }
    }
}
