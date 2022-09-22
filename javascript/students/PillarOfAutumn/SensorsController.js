import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
        this.timeCounter = 0;
        this.asteroidHeading = [];
        this.slowDown = false;
    }
    sensorsUpdate(activeScan, passiveScan) {
        if (this.timeCounter % 50 == 0) {
            const passScanRes = passiveScan();
            console.log(passScanRes);
            if (!(passScanRes instanceof Error)) {
                passScanRes.forEach((reading) => {
                    if (reading.gravity > 0.02) {
                        this.target = reading;
                        console.log(this.target);
                    }
                });
            }
            else {
                // Something went wrong, you should probably log this and make sure it doesn't happen again
            }
        }
        if (this.timeCounter % 60 == 0) {
            const activeScanResult = activeScan(this.navigation.angle, 1, 130);
            if (!(activeScanResult instanceof Error)) {
                activeScanResult.forEach((reading) => {
                    var _a, _b;
                    if (((_a = reading.closeRange) === null || _a === void 0 ? void 0 : _a.type) == "Asteroid") {
                        this.asteroidHeading.push(reading);
                        console.log(reading.closeRange.type);
                    }
                    if (((_b = reading.closeRange) === null || _b === void 0 ? void 0 : _b.type) == "Planet") {
                        this.slowDown == true;
                    }
                });
            }
        }
        this.timeCounter++;
    }
}
