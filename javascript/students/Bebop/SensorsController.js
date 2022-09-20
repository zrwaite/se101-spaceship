import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
    }
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error)) {
            this.target = scanResult[0];
            console.log(activeScan(scanResult[0].heading, 1, 2500));
            console.log(scanResult);
        }
    }
}
