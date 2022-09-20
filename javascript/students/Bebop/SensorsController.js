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
            const activeScanData = activeScan(this.target.heading - 1, 2, 300);
            if (!(activeScanData instanceof Error)) {
                this.closeRange = activeScanData;
                console.log(this.closeRange);
            }
        }
    }
}
