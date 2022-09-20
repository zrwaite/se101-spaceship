import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
        this.closeRangeObject = null;
    }
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        const activeResult = this.target ? activeScan(this.target.heading - 3.14 / 6, 3.14 / 3, 200) : Error;
        if (!(scanResult instanceof Error))
            this.target = scanResult[0];
        // if((activeResult instanceof Array<EMSReading>) && activeResult[0].closeRange) {
        //   this.closeRangeObject = activeResult[0].closeRange.type;
        // }
        this.closeRangeObject && console.log(this.closeRangeObject);
    }
}
