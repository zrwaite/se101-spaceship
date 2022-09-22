import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        this.target = null;
        this.emsReading = [];
        // use passive scan
        // use active scan for asteroids
        // can identify objects based on gravity signature (planets have a higher gravity signature than asteroids)
    }
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error))
            this.target = scanResult[0];
        this.emsReading = activeScan(0, Math.PI, 500);
        console.log(this.emsReading);
        /**
         * Scanning Algorithm:
         * First, split the map into smaller regions
         * Then, utilizing any path algorithm, find the optimal path to leave the region
         * and move onto the next region
         * 	Also, check adjacent regions for:
         * 		What objects are located in the regions beside them, and base the heading of the ship
         * 		based on this information
         * 		Also mark each region as travelled to unsure that the ship is not heading into the
         * 		same region
         *
         * Repeat this algorithm until a warp gate or a planet is found
         */
    }
}
