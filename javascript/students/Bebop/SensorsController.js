import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
    }
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error)) {
            this.target = scanResult[0];
            const scanRes = activeScan(this.target.heading - 1, 2, 300);
            if (!(scanRes instanceof Error)) {
                scanRes.forEach((reading) => {
                    console.log(reading);
                });
            }
            else {
                throw scanRes;
            }
        }
    }
}
