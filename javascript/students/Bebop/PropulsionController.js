import { angleDiff } from '../helpers.js';
import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
        const angularVelocity = this.navigation.angularVelocity;
        const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading);
        const direction = angularVelocity == 0 ? "away" : headingDiff / angularVelocity < 0 ? "towards" : "away";
        let force = 0;
        if (Math.abs(headingDiff) < 0.2) {
            setThruster('clockwise', 0);
            setThruster('counterClockwise', 0);
        }
        else if (direction == "away" || direction == "towards" && Math.abs(headingDiff) > 0.5) {
            // implement algorithm to go back
            force = Math.min(Math.abs(500 * headingDiff * Math.sqrt(Math.abs(headingDiff))), 100);
            console.log("accelerate");
            if (headingDiff < 0) {
                setThruster('clockwise', force);
                setThruster('counterClockwise', 0);
            }
            else {
                setThruster('counterClockwise', force);
                setThruster('clockwise', 0);
            }
        }
        else if (direction == "towards" && angularVelocity < 0.5 * headingDiff) {
            // adjusts ship if its slightly out of aim
            force = Math.min(Math.abs(100 * headingDiff), 100);
            console.log("adjust");
            if (headingDiff < 0) {
                setThruster('clockwise', force);
                setThruster('counterClockwise', 0);
            }
            else {
                setThruster('counterClockwise', force);
                setThruster('clockwise', 0);
            }
        }
        else {
            // implement algorithm to slow down
            force = Math.min((angularVelocity * angularVelocity) * 200000 / Math.abs(headingDiff), 100);
            console.log("decelerate");
            // console.log(force)
            if (headingDiff < 0) {
                let error = setThruster('counterClockwise', force);
                if (error)
                    console.log(error);
                error = setThruster('clockwise', 0);
                if (error)
                    console.log(error);
            }
            else {
                let error = setThruster('clockwise', force);
                if (error)
                    console.log(error);
                error = setThruster('counterClockwise', 0);
                if (error)
                    console.log(error);
            }
        }
        setThruster('main', Math.abs(headingDiff) < 0.2 ? 100 : 0);
    }
}
