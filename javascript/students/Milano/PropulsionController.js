import { angleDiff, Vector2 } from '../helpers.js';
import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    constructor() {
        super(...arguments);
<<<<<<< HEAD
        this.currDirection = new Vector2(0, 0); // @ts-ignore
=======
        this.currDirection = new Vector2(0, 0);
>>>>>>> e9c8317a810f4c02e9a55d5535e4e2750191e55e
    }
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
<<<<<<< HEAD
        const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading);
        const force = Math.min(Math.abs(100 * headingDiff), 100);
        if (this.currDirection.equals(new Vector2(0, 0))) {
            this.currDirection.add(new Vector2(force, headingDiff));
        }
        else {
            if (this.currDirection.angle() > headingDiff) {
                this.currDirection.angleTo(new Vector2(force, headingDiff));
            }
        }
        if (this.currDirection.angle() < 0) {
            setThruster('clockwise', force);
            setThruster('counterClockwise', force / 2);
        }
        else {
            setThruster('counterClockwise', force);
            setThruster('clockwise', force / 2);
        }
        setThruster("main", Math.abs(this.currDirection.angle()) < 0.1 ? 15000 : 100);
=======
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
>>>>>>> e9c8317a810f4c02e9a55d5535e4e2750191e55e
    }
}
