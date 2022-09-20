import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
        this.passiveScans = [];
        this.activeScans = [];
    }
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error)) {
            this.target = scanResult[0];
            this.passiveScans.push(scanResult);
            console.log(this.passiveScans);
        }
        const activeResult = activeScan(0, Math.PI, 1000);
        if (!(activeResult instanceof Error)) {
            this.activeScans.push(activeResult);
            console.log(activeResult);
        }
        //console.log(activeResult)
    }
}
