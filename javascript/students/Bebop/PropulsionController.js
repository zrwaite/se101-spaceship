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
            const heading = this.sensors.asteroidAhead ? this.sensors.planetDirection : this.sensors.idealHeading;
            const angleDiff = withinPiRange(shipStatusInfo.angle - heading);
            if (shipStatusInfo.angularVelocity > 0.03) {
                this.clockwise = 0;
                this.counterClockwise = 100;
            }
            else if (shipStatusInfo.angularVelocity < -0.03) {
                this.clockwise = 100;
                this.counterClockwise = 0;
            }
            else if (Math.abs(shipStatusInfo.angularVelocity) < 0.02) {
                if (angleDiff < 0) {
                    this.clockwise = Math.abs(shipStatusInfo.angularVelocity * 2000 + angleDiff * 50);
                    this.counterClockwise = 0;
                }
                else {
                    this.clockwise = 0;
                    this.counterClockwise = shipStatusInfo.angularVelocity * 2000 + angleDiff * 50;
                }
                if (Math.abs(angleDiff) < 0.5) {
                    if (this.sensors.planetAhead) {
                        if (shipStatusInfo.linearVelocity.magnitude() < 0.5) {
                            setThrusters('main', this.sensors.planetDistance / 2);
                        }
                        else if (shipStatusInfo.linearVelocity.magnitude() > 0.75) {
                            setThrusters('bow', 100);
                        }
                    }
                    else {
                        setThrusters('main', 30);
                        setThrusters('bow', 0);
                    }
                }
                else {
                    setThrusters('main', 0);
                    setThrusters('bow', 0);
                }
            }
            setThrusters('clockwise', this.clockwise);
            setThrusters('counterClockwise', this.counterClockwise);
        }
        //Student code goes here
    }
}
