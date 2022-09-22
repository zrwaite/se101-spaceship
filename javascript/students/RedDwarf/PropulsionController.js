import PropulsionController from "../../src/subsystems/propulsionController.js";
import { angleDiff } from "../../src/helpers/Angles.js";
// import { getShipStatus } from "./utils.js";
export default class YourPropulsionController extends PropulsionController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.prevHeadingDiff = 0;
        this.maxOutput = 0;
        this.kWeight = 300;
        this.dWeight = 5000;
    }
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return; //WTF is this
        const currHeadingDiff = angleDiff(//calculate heading angle
        this.navigation.angle, this.sensors.target.heading);
        const angularVelocity = getShipStatus("angularVelocity");
        var headingOutput = 0;
        const headingDiffRate = currHeadingDiff - this.prevHeadingDiff; //Find "derivative" of error
        const KpHeadingOutput = currHeadingDiff * this.kWeight; //Calculate terms
        const KdHeadingOutput = headingDiffRate * this.dWeight;
        headingOutput = KpHeadingOutput + KdHeadingOutput;
        console.log("OUTPUT: " + headingOutput);
        headingOutput = Math.min(Math.max(headingOutput, -100), 100);
        this.maxOutput = Math.max(this.maxOutput, Math.abs(headingOutput));
        if (headingOutput < 0) {
            setThruster('clockwise', Math.abs(headingOutput));
            setThruster('counterClockwise', 0);
        }
        else {
            setThruster('counterClockwise', Math.abs(headingOutput));
            setThruster('clockwise', 0);
        }
        setThruster("main", Math.abs(currHeadingDiff) < 0.2 ? 30 : 0);
        this.prevHeadingDiff = currHeadingDiff;
    }
}
