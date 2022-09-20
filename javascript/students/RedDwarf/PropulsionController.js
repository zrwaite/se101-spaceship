import PropulsionController from "../../src/subsystems/propulsionController.js";
import { angleDiff } from "../../src/helpers/Angles.js";
export default class YourPropulsionController extends PropulsionController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.prevError = 0;
        this.kForceConst = 20;
        this.dForceConst = -10;
    }
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
        if (!this.sensors.target)
            return; //WTF is this
        const currError = angleDiff(//calculate heading angle
        this.navigation.angle, this.sensors.target.heading);
        var output = 0;
        const errorDiff = currError - this.prevError;
        const K = currError * 500;
        const D = errorDiff * 5000;
        output = K + D;
        console.log("angle" + currError);
        // if(Math.abs(currError) > Math.PI/180 * 15) {
        //   if(currError > 0) {
        //     output = 30;
        //     console.log("POS")
        //   }else{
        //     output = -30;
        //     console.log("NEG")
        //   }
        // }else{
        //   const errorDiff = currError-this.prevError;
        //   console.log(errorDiff);
        //   output = errorDiff * 5000;
        // }
        console.log("OUTPUT: " + output);
        // console.log((currError-this.prevError)*100);
        // const errorDiff = currError-this.prevError;
        // const kForce = this.kForceConst * currError; 
        // const dForce = this.dForceConst * errorDiff;
        // const force = kForce + dForce;
        // console.log("force " + force);
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
