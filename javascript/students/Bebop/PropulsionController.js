import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    angleDiff(a, b) {
        return (a - b);
    }
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
        const headingDiff = this.angleDiff(this.navigation.angle, this.sensors.target.heading);
        const force = Math.min(Math.abs(500 * headingDiff), 100);
        if (headingDiff < 0) {
            setThruster('clockwise', force);
            setThruster('counterClockwise', 0);
        }
        else {
            setThruster('counterClockwise', force);
            setThruster('clockwise', 0);
        }
        setThruster('main', Math.abs(headingDiff) < 0.2 ? 30 : 0);
    }
}
