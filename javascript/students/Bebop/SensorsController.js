import { withinPiRange } from '../helpers.js';
import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        this.asteroidAhead = false;
        this.asteroidDirection = 0;
        this.timer = 0;
        this.idealHeading = 0;
        this.planetAhead = false;
        this.planetDistance = 0;
        this.planetDirection = 0;
    }
    sensorsUpdate(shipStatusInfo, activeScan, passiveScan) {
        //Student code goes here
        this.timer++;
        if (this.timer % 50 == 0) {
            this.asteroidAhead = false;
            this.planetAhead = false;
            let startAngle = withinPiRange(shipStatusInfo.angle - Math.PI / 4);
            let arc = Math.PI / 2;
            let res = activeScan(startAngle, arc, 300);
            if (res.response.length > 0) {
                res.response.sort((a, b) => b.amplitude - a.amplitude);
                const asteroidTarget = res.response[res.response.length - 1];
                const planetTarget = res.response[0];
                this.asteroidAhead = true;
                this.asteroidDirection = asteroidTarget.angle;
                this.planetDirection = planetTarget.angle;
                if (planetTarget.closeRange) {
                    this.planetAhead = true;
                    this.planetDistance = planetTarget.closeRange.distance;
                }
            }
        }
        if (this.timer % 50 == 25) {
            let res = passiveScan();
            this.idealHeading = res.response[0].heading;
        }
    }
}
