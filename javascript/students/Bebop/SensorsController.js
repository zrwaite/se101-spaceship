import { withinPiRange } from '../helpers.js';
import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        this.asteroidAhead = false;
        this.asteroidDirection = 0;
        this.timer = 0;
        this.idealHeading = 0;
    }
    sensorsUpdate(shipStatusInfo, activeScan, passiveScan) {
        //Student code goes here
        this.timer++;
        if (this.timer % 50 == 0) {
            this.asteroidAhead = false;
            let startAngle = withinPiRange(shipStatusInfo.angle - Math.PI / 4);
            let arc = Math.PI / 2;
            let res = activeScan(startAngle, arc, 300);
            if (res.response.length > 0) {
                this.asteroidAhead = true;
                this.asteroidDirection = res.response[0].Angle;
                console.log(this.asteroidDirection);
                console.log(shipStatusInfo.angle);
            }
        }
        if (this.timer % 10 == 0) {
            this.idealHeading = passiveScan().response[0].Heading;
        }
    }
}
