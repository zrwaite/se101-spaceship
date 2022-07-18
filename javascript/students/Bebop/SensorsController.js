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
            console.log(shipStatusInfo.angle - Math.PI / 4);
            let startAngle = withinPiRange(shipStatusInfo.angle - Math.PI / 4);
            console.log(startAngle);
            let arc = Math.PI / 2;
            let res = activeScan(startAngle, arc, 300);
            console.log(res);
            if (res.response.length > 0) {
                this.asteroidAhead = true;
                this.asteroidDirection = res.response[0].Angle;
                res.response[0].ScanSignature;
                console.log(this.asteroidDirection);
                console.log(shipStatusInfo.angle);
            }
        }
        if (this.timer % 50 == 25) {
            let res = passiveScan();
            console.log(res.success);
            this.idealHeading = res.response[0].heading;
        }
    }
}
