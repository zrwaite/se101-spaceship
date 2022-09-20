import { angleDiff } from '../helpers.js';
import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        //Student code goes here
        if (!this.sensors.target)
            return;
        const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading);
        const turnForce = Math.min(Math.abs(100 * headingDiff), 20);
        let mainForce = 80;
        let bowForce = 0;
        if (this.sensors.targetDistance != 0
            && this.sensors.targetDistance < 250
        /*&& this.sensors.targetType == "Planet" */ ) {
            console.log("hey");
            mainForce = 0;
            bowForce = 100;
        }
        if (headingDiff < 0) {
            setThruster('clockwise', turnForce);
            setThruster('counterClockwise', 0);
        }
        else {
            setThruster('counterClockwise', turnForce);
            setThruster('clockwise', 0);
        }
        setThruster('main', Math.abs(headingDiff) < 0.20 ? mainForce : 0);
        setThruster('bow', bowForce);
    }
}
