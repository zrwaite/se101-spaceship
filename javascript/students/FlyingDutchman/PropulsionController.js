import { angleDiff } from "../helpers.js";
import PropulsionController from "../../src/subsystems/propulsionController.js";
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        const headingDiff = angleDiff(this.navigation.angle, this.navigation.getTargetAngle);
        //const force = Math.abs(200*headingDiff)
        const force = Math.min(Math.abs(500 * headingDiff), 10);
        if (headingDiff < 0) {
            setThruster("clockwise", force);
            setThruster("counterClockwise", Math.abs(headingDiff) < 0.5 ? force - 1 : 0);
        }
        else {
            setThruster("counterClockwise", force);
            setThruster("clockwise", Math.abs(headingDiff) < 0.5 ? force - 1 : 0);
        }
        // setThruster('main', Math.abs(headingDiff) < 0.2 ? 50 : 10)
        let main = Math.abs(headingDiff) < 0.2 ? 0.05 * this.navigation.getTargetMagnitude : 0;
        console.log(headingDiff, this.navigation.getTargetMagnitude, main);
        setThruster("main", main);
        //Thruster Speed
    }
}
