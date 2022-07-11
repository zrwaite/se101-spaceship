import { withinPiRange } from '../helpers.js';
import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        this.asteroidAhead = false;
        this.asteroidDirection = 0;
        this.timer = 0;
    }
    sensorsUpdate(shipStatusInfo, activeScan, passiveScan) {
        //Student code goes here
        this.timer++;
        if (this.timer % 100 == 0) {
            this.asteroidAhead = false;
            let startAngle = withinPiRange(shipStatusInfo.angle - Math.PI / 4);
            let arc = Math.PI / 2;
            let res = activeScan(startAngle, arc, 300);
            res.response.forEach((obj) => {
                console.log(obj.Velocity);
                if (obj.Velocity.x !== 0 || obj.Velocity.y !== 0) {
                    console.log('asteroid ahead');
                    this.asteroidAhead = true;
                    this.asteroidDirection = obj.Angle;
                }
            });
        }
    }
}
