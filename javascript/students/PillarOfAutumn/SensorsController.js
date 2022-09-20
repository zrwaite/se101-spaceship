import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
    }
    sensorsUpdate(activeScan, passiveScan) {
        //Student code goes here
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error))
            this.target = scanResult[0];
    }
}
