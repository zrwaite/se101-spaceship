import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
        // const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading)
        const headingDiff = this.navigation.targetAngle;
        //const force = Math.abs(200*headingDiff)
        const force = Math.min(Math.abs(500 * headingDiff), 10);
        if (headingDiff < 0) {
            setThruster('clockwise', force);
            setThruster('counterClockwise', 0);
        }
        else {
            setThruster('counterClockwise', force);
            setThruster('clockwise', 0);
        }
        setThruster('main', Math.abs(headingDiff) < 0.2 ? 30 : 0);
        //setThruster('main', Math.abs(headingDiff) < 0.2 ? 10*this.navigation.distance : 0)
    }
}
