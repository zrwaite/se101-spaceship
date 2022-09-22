import SensorsController from "../../src/subsystems/sensorsController.js";
let allObjects = []; // array of all objects in galaxy
let activeScanObjects = [];
function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0); }
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        this.target = null;
    }
    //Add additional attributes here
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error)) {
            if (!this.target) {
                // checks if scan object already exists in all Objects
                // Two passive scans are started, so the positions of moving objects are
                // different in each of the passsive scans.
                // If a position recorded in both passive scans is the same,
                // that object is the planet
                allObjects.forEach(planet => {
                    if (JSON.stringify(planet) == JSON.stringify(scanResult)) {
                        console.log("found the planet", scanResult[0]);
                        this.target = scanResult[0]; // sets target to planet
                    }
                });
                allObjects.push(scanResult); // adds object to array
            }
        }
        //else if found target
        else {
            const activeScanResult = activeScan(this.target.heading, 0.6, 5);
            this.activeScanResult = activeScanResult;
            if (!(activeScanResult instanceof Error)) {
                activeScanObjects.push(activeScanResult);
            }
        }
    }
}
