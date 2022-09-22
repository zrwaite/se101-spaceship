import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
    }
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        // console.log(scanResult)
        if (!(scanResult instanceof Error))
            this.target = scanResult[0];
        // const activeScanResult = activeScan(0, 3.1, 500)
        // console.log(activeScanResult)
    }
}
