import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
        this.spaceObjects = null;
        this.targetDistance = 0;
    }
    rad(angleDeg) {
        return angleDeg * Math.PI / 180;
    }
    sensorsUpdate(activeScan, passiveScan) {
        const passiveScanResult = passiveScan();
        if (!(passiveScanResult instanceof Error))
            console.log(passiveScanResult);
        if (!(passiveScanResult instanceof Error))
            this.target = passiveScanResult[0];
        const activeScanResult = activeScan(this.navigation.angle - this.rad(10), this.rad(20), 200); // Lower range for more fuel efficiency
        if (!(activeScanResult instanceof Error))
            console.log(activeScanResult);
        if (!(activeScanResult instanceof Error)) {
            if (activeScanResult.length > 0) {
                this.targetDistance = activeScanResult[0].distance;
            }
        }
        // console.log(this.targetDistance)
    }
}
