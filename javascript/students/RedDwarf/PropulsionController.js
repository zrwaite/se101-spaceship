import PropulsionController from "../../src/subsystems/propulsionController.js";
import { angleDiff } from "../../src/helpers/Angles.js";
export default class YourPropulsionController extends PropulsionController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.prevError = 0;
        this.maxOutput = 0;
        this.kWeight = 300;
        this.dWeight = 5000;
    }
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return; //WTF is this
        const currError = angleDiff(//calculate heading angle
        this.navigation.angle, this.sensors.target.heading);
        var output = 0;
        const errorDiff = currError - this.prevError; //Find "derivative" of error
        const K = currError * this.kWeight; //Calculate terms
        const D = errorDiff * this.dWeight;
        output = K + D;
        // console.log("ANGLE: " + currError)
        console.log("OUTPUT: " + output);
        //Calculate maxoutput
        this.maxOutput = Math.max(this.maxOutput, Math.abs(output));
        // console.log("MAXOUTPUT: " + this.maxOutput)
        if (output < 0) {
            setThruster('clockwise', Math.min(Math.abs(output), 100));
            setThruster('counterClockwise', 0);
        }
        else {
            setThruster('counterClockwise', Math.min(Math.abs(output), 100));
            setThruster('clockwise', 0);
        }
        setThruster("main", Math.abs(currError) < 0.2 ? 30 : 0);
        this.prevError = currError;
    }
}
