import SensorsController from '../../src/subsystems/sensorsController.js';
let allObjects = []; // array of all objects in galaxy
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
                // checks if scan object already exists in allObjects
                // if it does, that object is the planet
                allObjects.forEach(planet => {
                    if (JSON.stringify(planet) == JSON.stringify(scanResult)) {
                        console.log("found the planet", scanResult[0]);
                        this.target = scanResult[0]; // sets target to planet
                    }
                });
                allObjects.push(scanResult); // adds object to array
            }
        }
    }
}
