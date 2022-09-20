import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
        this.closeRangeObject = null;
    }
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        const activeResult = this.target ? activeScan(this.target.heading - 3.14 / 2, 3.14, 200) : new Error("not ready");
        if (!(scanResult instanceof Error))
            this.target = scanResult[0];
        if (!(activeResult instanceof Error)) {
            this.closeRangeObject = activeResult;
        }
    }
}
