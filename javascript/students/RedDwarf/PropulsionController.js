import PropulsionController from "../../src/subsystems/propulsionController.js";
import { angleDiff } from "../../src/helpers/Angles.js";
// import { getPlanets, getShip } from "./utils.js";
export default class YourPropulsionController extends PropulsionController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.prevHeadingDiff = 0;
        this.maxOutput = 0;
        this.KpWHeading = 300;
        this.KdWHeading = 5000;
        this.prevDist = 0;
    }
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
        const currHeadingDiff = angleDiff(//calculate heading angle
        this.navigation.angle, this.sensors.target.heading);
        // const planetArr = getPlanets(); //function to make the ship slow down
        // const dist = Math.sqrt(Math.pow(getShip().pos.x - planetArr[0].pos.x, 2) + Math.pow(getShip().pos.y - planetArr[0].pos.y, 2)); //Replace with given distance value
        const dist = 20;
        const distRate = dist - this.prevDist;
        var distOutput = 0;
        const KpDistOutput = dist * 1;
        const KdDistOutput = distRate * 300;
        distOutput = KpDistOutput + KdDistOutput;
        var headingOutput = 0;
        const headingDiffRate = currHeadingDiff - this.prevHeadingDiff; //Find "derivative" of error
        const KpHeadingOutput = currHeadingDiff * this.KpWHeading; //Calculate terms
        const KdHeadingOutput = headingDiffRate * this.KdWHeading;
        headingOutput = KpHeadingOutput + KdHeadingOutput;
        // console.log("OUTPUT: " + headingOutput);
        headingOutput = Math.min(Math.max(headingOutput, -100), 100);
        distOutput = Math.min(Math.max(distOutput, -100), 100);
        console.log("DO: " + distOutput);
        // console.log("GET: " + distRate)
        this.maxOutput = Math.max(this.maxOutput, Math.abs(headingOutput));
        if (headingOutput < 0) {
            setThruster('clockwise', Math.abs(headingOutput));
            setThruster('counterClockwise', 0);
        }
        else {
            setThruster('counterClockwise', Math.abs(headingOutput));
            setThruster('clockwise', 0);
        }
        // setThruster("main", Math.abs(currHeadingDiff) < 0.2 ? 30 : 0);
        if (Math.abs(currHeadingDiff) < Math.PI / 180 * 10) {
            if (distOutput < 0) {
                setThruster('main', 0);
                setThruster('bow', Math.abs(distOutput));
            }
            else {
                setThruster('main', Math.abs(distOutput));
                setThruster('bow', Math.abs(distOutput));
            }
        }
        this.prevHeadingDiff = currHeadingDiff;
        this.prevDist = dist;
    }
}
