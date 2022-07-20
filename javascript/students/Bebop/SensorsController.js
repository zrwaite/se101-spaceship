import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        this.asteroidAhead = false;
        this.asteroidDirection = 0;
        this.timer = 0;
        this.planetAhead = false;
        this.planetDistance = 0;
        this.planetDirection = 0;
    }
    sensorsUpdate(shipStatusInfo, activeScan, passiveScan) { }
}
