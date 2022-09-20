import SensorsController from "../../src/subsystems/sensorsController.js";
export default class YourSensorsController extends SensorsController {
    sensorsUpdate(activeScan, passiveScan) {
        if (this.navigation.angle === undefined)
            return;
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error))
            this.target = scanResult[0];
        const activeScanResult = activeScan(this.navigation.angle, Math.PI, 100);
        if (!(activeScanResult instanceof Error)) {
            this.activeScan = activeScanResult.sort((r1, r2) => r1.distance - r2.distance);
        }
    }
}
