import PropulsionController from "../../src/subsystems/propulsionController.js";
import { angleDiff } from "../../src/helpers/Angles.js";
export default class YourPropulsionController extends PropulsionController {
    constructor() {
        super(...arguments);
        this.currDist = 0;
        //Add additional attributes here
        this.prevHeadingDiff = 0;
        this.maxOutput = 0;
        this.KpWHeading = 300;
        this.KdWHeading = 5000;
        this.prevDist = 0;
    }
    //propulsion update pulls data about the ship and its trajectory
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
        const currHeadingDiff = angleDiff(//calculate heading angle
        this.navigation.angle, this.sensors.target.heading);
        let target = 0;
        let dist = 0;
        //Calculate distance from target
        dist = Math.sqrt(Math.pow(this.navigation.shipX - this.sensors.targetX, 2) + Math.pow(this.navigation.shipY - this.sensors.targetY, 2)); //Replace with given distance value
        this.currDist = dist;
        console.log("DIST: " + dist);
        console.log("GRAV: " + this.sensors.target.gravity);
        debugger;
        //PD control calculations
        const distRate = dist - this.prevDist;
        var distOutput = 0;
        const KpDistOutput = dist * 1;
        const KdDistOutput = distRate * 300;
        if (dist > 50) { //Long range: Use PD control
            distOutput = KpDistOutput + KdDistOutput;
        }
        else { //Short range: Slowly go forward
            distOutput = 20;
        }
        var headingOutput = 0;
        const headingDiffRate = currHeadingDiff - this.prevHeadingDiff; //Find "derivative" of error
        const KpHeadingOutput = currHeadingDiff * this.KpWHeading; //Calculate terms
        const KdHeadingOutput = headingDiffRate * this.KdWHeading;
        headingOutput = KpHeadingOutput + KdHeadingOutput;
        //Clamp outputs between -100 and 100
        headingOutput = Math.min(Math.max(headingOutput, -100), 100);
        distOutput = Math.min(Math.max(distOutput, -100), 100);
        console.log("DO: " + distOutput);
        this.maxOutput = Math.max(this.maxOutput, Math.abs(headingOutput));
        //Turn the ship
        if (headingOutput < 0) {
            setThruster('clockwise', Math.abs(headingOutput));
            setThruster('counterClockwise', 0);
        }
        else {
            setThruster('counterClockwise', Math.abs(headingOutput));
            setThruster('clockwise', 0);
        }
        //Drive the ship 
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
