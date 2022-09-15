import SensorsController from '../../src/subsystems/sensorsController.js';
import { PassiveReading } from '../types.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = new PassiveReading(0, 0);
    }
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error))
            this.target = scanResult[0];
    }
}
