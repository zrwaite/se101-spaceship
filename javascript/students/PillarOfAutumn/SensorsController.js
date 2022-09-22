import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
        this.timeCounter = 0;
    }
    sensorsUpdate(activeScan, passiveScan) {
        if (this.timeCounter % 120 == 0) {
            const passScanRes = passiveScan();
            if (!(passScanRes instanceof Error)) {
                passScanRes.forEach((reading) => {
                    if (reading.gravity > 20000) {
                        this.target = reading;
                    }
                });
            }
            else {
                // Something went wrong, you should probably log this and make sure it doesn't happen again
            }
        }
        if (this.timeCounter % 180 == 0) {
            const activeScanResult = activeScan(this.navigation.angle, 0.3, 400);
        }
        this.timeCounter++;
    }
}
