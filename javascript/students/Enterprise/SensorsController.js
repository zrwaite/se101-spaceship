import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.targets = [];
        this.closeRangeObject = null;
        this.ready = false;
        this.destinations = null;
    }
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        const activeResult = activeScan(this.navigation.angle - 3.14 / 2, 3.14, 200);
        if (!(scanResult instanceof Error)) {
            // if(!this.ready) {
            // 	for (const item of scanResult) {
            // 		let initActiveRes = activeScan(item.heading - 3.14/10000, 3.14/5000, 720)
            // 		if(!(initActiveRes instanceof Error)) {
            // 			for (const spaceObj of initActiveRes) {
            // 				if(spaceObj.radius > 25 && spaceObj.radius < 45 && spaceObj.distance * item.gravity > 2500) {
            // 				}
            // 			}
            // 		}
            // 	}
            // }
            // else	
        }
        if (!(scanResult instanceof Error)) {
            scanResult.forEach((target, idx) => {
                const heading = target.heading;
                const guess = target.gravity < 0 ? "WarpGate" : "Planet";
                this.targets[idx] = { heading: heading, guess: guess };
            });
        }
        if (!(activeResult instanceof Error)) {
            this.closeRangeObject = activeResult;
        }
    }
}
