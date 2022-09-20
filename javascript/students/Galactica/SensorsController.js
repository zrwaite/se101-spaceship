import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
        this.spaceObjects = null;
        this.targetDistance = 0;
    }
    // helper function to convert degrees to radians
    rad(angleDeg) {
        return angleDeg * Math.PI / 180;
    }
    sensorsUpdate(activeScan, passiveScan) {
        const passiveScanResult = passiveScan();
        if (!(passiveScanResult instanceof Error))
            console.log(passiveScanResult);
        if (!(passiveScanResult instanceof Error))
            this.target = passiveScanResult[0]; //reading first object that passiveScan scans
        const activeScanResult = activeScan(this.navigation.angle - this.rad(10), this.rad(20), 400); // Lower range for energy efficiency
        if (!(activeScanResult instanceof Error))
            console.log(activeScanResult);
        if (!(activeScanResult instanceof Error)) {
            if (activeScanResult.length > 0) {
                //
                this.targetDistance = activeScanResult[0].distance; //finding distance to first object activeScan scans
            }
        }
        // console.log(this.targetDistance)
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
}
