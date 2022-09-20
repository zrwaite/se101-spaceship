import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
        this.closeRange = null;
    }
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error)) {
            this.target = scanResult[0];
            var activeScanResult = activeScan(2, 1, 2);
            if (!(activeScanResult instanceof Error)) {
                for (var reading in activeScanResult) {
                    console.log(reading);
                }
            }
            else {
                throw activeScanResult;
            }
        }
    }
}
