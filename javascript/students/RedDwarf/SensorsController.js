import SensorsController from "../../src/subsystems/sensorsController.js";
import "./main.js";
let allObjects = []; // array of all objects in galaxy
// let activeScanObjects: Object[] = [];
// function isNumber(n: any) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        this.target = null;
    }
    // @ts-ignore
    // activeScanResult: EMSReading[] | Error
    //Add additional attributes here
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error)) {
            //   if (!this.target){
            // checks if scan object already exists in all Objects
            // Two passive scans are started, so the positions of moving objects are
            // different in each of the passsive scans.
            // If a position recorded in both passive scans is the same,
            // that object is the planet
            allObjects.forEach(planet => {
                if (JSON.stringify(planet) == JSON.stringify(scanResult)) {
                    console.log("found the planet", scanResult[0]);
                    this.target = scanResult[0]; // sets target to planet
                    console.log("ALDKJSALDKJ");
                }
            });
            allObjects.push(scanResult); // adds object to array
        }
        // }
        //else if found target
        else {
            const activeScanResult = activeScan(1, 3, 5);
            // this.activeScanResult = activeScanResult;
            if (!(activeScanResult instanceof Error)) {
                console.log(activeScanResult);
                // activeScanObjects.push(activeScanResult);
            }
        }
    }
}
