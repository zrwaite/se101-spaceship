import { withinPiRange } from '../helpers.js';
import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    constructor() {
        super(...arguments);
        this.timer = 0;
        this.clockwise = 0;
        this.counterClockwise = 0;
    }
    propulsionUpdate(shipStatusInfo, setThrusters) {
        if (this.sensors) {
            const angleDiff = withinPiRange(shipStatusInfo.angle - this.sensors.idealHeading);
            if (shipStatusInfo.angularVelocity > 0.03) {
                console.log('too fast');
                this.clockwise = 0;
                this.counterClockwise = 100;
            }
            else if (shipStatusInfo.angularVelocity < -0.03) {
                console.log('too fast');
                this.clockwise = 100;
                this.counterClockwise = 0;
            }
            else if (Math.abs(shipStatusInfo.angularVelocity) < 0.02) {
                if (angleDiff < 0) {
                    this.clockwise = Math.abs(shipStatusInfo.angularVelocity * 500 + angleDiff * 50);
                    this.counterClockwise = 0;
                }
                else {
                    this.clockwise = 0;
                    this.counterClockwise = shipStatusInfo.angularVelocity * 500 + angleDiff * 50;
                }
                if (this.sensors.planetAhead) {
                    setThrusters('main', this.sensors.planetDistance / 2);
                }
                else
                    setThrusters('main', 20);
            }
            setThrusters('clockwise', this.clockwise);
            setThrusters('counterClockwise', this.counterClockwise);
        }
        //Student code goes here
    }
}
