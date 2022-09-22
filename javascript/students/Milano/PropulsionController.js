import { angleDiff, Vector2 } from '../helpers.js';
import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    constructor() {
        super(...arguments);
        this.currDirection = new Vector2(0, 0);
    }
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
        if (this.currDirection.equals(new Vector2(0, 0))) {
            const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading);
            const force = Math.min(Math.abs(100 * headingDiff), 100) * 100;
            this.currDirection.add(new Vector2(force, headingDiff));
            if (this.currDirection.angle() < 0) {
                setThruster('clockwise', force);
                setThruster('counterClockwise', 0);
            }
            else {
                setThruster('counterClockwise', force);
                setThruster('clockwise', 0);
            }
            setThruster('main', Math.abs(headingDiff) < 0.2 ? 30 : 0);
            return;
        }
        setThruster("main", this.currDirection.magnitude() * 1000);
    }
}
