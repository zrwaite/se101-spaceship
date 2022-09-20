import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
        this.closeRangeObject = null;
    }
    sensorsUpdate(activeScan, passiveScan) {
        var _a;
        const scanResult = passiveScan();
        const activeResult = this.target ? activeScan(this.target.heading - 3.14 / 6, 3.14 / 3, 200) : new Error("not ready");
        if (!(scanResult instanceof Error))
            this.target = scanResult[0];
        if (!(activeResult instanceof Error) && ((_a = activeResult[0]) === null || _a === void 0 ? void 0 : _a.closeRange)) {
            this.closeRangeObject = activeResult[0].closeRange.type;
        }
        this.closeRangeObject && console.log(this.closeRangeObject);
    }
}
