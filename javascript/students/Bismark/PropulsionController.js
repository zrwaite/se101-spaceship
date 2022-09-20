import { angleDiff } from "../helpers.js";
import PropulsionController from "../../src/subsystems/propulsionController.js";
export default class YourPropulsionController extends PropulsionController {
    propulsionUpdate(setThruster) {
        var _a, _b;
        //Student code goes here
        if (!this.sensors.target)
            return;
        if (this.navigation.angle === undefined)
            return;
        // Speed by getting magnitude
        const speed = Math.pow(((_a = this.navigation.linearVelocityX) !== null && _a !== void 0 ? _a : 0) ** 2 +
            ((_b = this.navigation.linearVelocityY) !== null && _b !== void 0 ? _b : 0) ** 2, 1 / 2);
        const correctionalForce = 250;
        const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading);
        const force = Math.min(Math.abs(100 * headingDiff), 50);
        const headingDiffBuffer = 0;
        if (headingDiff < -headingDiffBuffer) {
            if (this.prevHeadingDiff &&
                this.prevHeadingDiff - headingDiff < -0.001 && // If the spaceship is turning "fast"
                headingDiff >= -0.5 // If almost pointing at the right direction
            ) {
                // Thrust other way
                setThruster("counterClockwise", correctionalForce);
                setThruster("clockwise", 0);
            }
            else {
                setThruster("clockwise", force);
                setThruster("counterClockwise", 0);
            }
        }
        else if (headingDiff > headingDiffBuffer) {
            if (this.prevHeadingDiff &&
                this.prevHeadingDiff - headingDiff > 0.001 &&
                headingDiff <= 0.5) {
                setThruster("clockwise", correctionalForce);
                setThruster("counterClockwise", 0);
            }
            else {
                setThruster("counterClockwise", force);
                setThruster("clockwise", 0);
            }
        }
        else {
            setThruster("counterClockwise", 0);
            setThruster("clockwise", 0);
        }
        setThruster("main", Math.abs(headingDiff) < 0.2 && speed < 0.75 ? 30 : 0);
        this.prevHeadingDiff = headingDiff;
        this.prevSpeed = speed;
    }
}
