import SensorsController from "../../src/subsystems/sensorsController.js";
export default class YourSensorsController extends SensorsController {
    sensorsUpdate(activeScan, passiveScan) {
        if (this.navigation.angle === undefined)
            return;
        const scanResult = passiveScan();
        //const scanResult2 = activeScan(this.navigation.angle - (Math.PI)/2, Math.PI, 100);
        if (!(scanResult instanceof Error))
            this.target = scanResult[0];
    }
}
