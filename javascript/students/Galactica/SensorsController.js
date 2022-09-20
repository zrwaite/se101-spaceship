import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
    }
    findMeteors(scanResults) {
        var meteors = [];
        if (scanResults instanceof Error)
            return;
        for (var scanResult of scanResults) {
            if (!(scanResult.closeRange)) {
                return;
            }
            if (scanResult.closeRange.type == 'Meteor') {
                meteors.push(scanResult);
            }
        }
        return meteors;
    }
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error))
            this.target = scanResult[0];
    }
}
