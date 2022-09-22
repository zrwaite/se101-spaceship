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
            const activeScanResult = activeScan(this.navigation.angle - Math.PI / 4, Math.PI / 2, 500);
            if (!(activeScanResult instanceof Error)) {
                this.targetDetails = activeScanResult.find((r) => { var _a, _b; return Math.abs(r.angle - ((_b = (_a = this.target) === null || _a === void 0 ? void 0 : _a.heading) !== null && _b !== void 0 ? _b : 0)) <= 0.01; });
                this.activeScan = activeScanResult.sort((r1, r2) => r1.distance - r2.distance);
            }
        }
        this.counter++;
    }
}
