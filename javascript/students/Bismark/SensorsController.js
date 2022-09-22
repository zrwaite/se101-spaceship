import SensorsController from "../../src/subsystems/sensorsController.js";
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        this.activeScan = [];
        //Add additional attributes here
        this.counter = 0;
    }
    sensorsUpdate(activeScan, passiveScan) {
        //Student code goes here
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error))
            this.target = scanResult[0];
        if (this.counter % 10 === 0) {
            const activeScanResult = activeScan(this.navigation.angle - Math.PI / 32, Math.PI / 16, 600);
            if (!(activeScanResult instanceof Error)) {
                this.activeScan = activeScanResult;
            }
        }
        this.counter++;
    }
}
