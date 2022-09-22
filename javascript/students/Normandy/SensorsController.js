import SensorsController from '../../src/subsystems/sensorsController.js';
//import { isPrivateIdentifier } from '../../../node_modules/typescript/lib/typescript.js'
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
        this.passiveScans = [];
        this.activeScans = [];
        this.passiveCooldown = 0;
        this.activeCooldown = 0;
    }
    sensorsUpdate(activeScan, passiveScan) {
        if (this.passiveCooldown <= 0) {
            const scanResult = passiveScan();
            if (!(scanResult instanceof Error)) {
                this.target = scanResult[0];
                this.passiveScans.push(scanResult);
                console.log(this.passiveScans);
            }
            this.passiveCooldown = 100;
        }
        if (this.activeCooldown <= 0) {
            const activeResult = activeScan(0, 0.5, 50);
            if (!(activeResult instanceof Error)) {
                this.activeScans.push(activeResult);
                console.log(activeResult);
            }
            this.activeCooldown = 50;
        }
        this.activeCooldown--;
        this.passiveCooldown--;
        //console.log(activeResult)
    }
}
