import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        this.target = null;
        //Add additional attributes here
        this.scannedObjects = [];
    }
    get warpgatesOrPlanets() {
        return this.scannedObjects.filter((so) => ['Other', "WarpGate"].includes(so.type));
    }
    get asteroids() {
        return this.scannedObjects.filter((so) => "Asteroid" == so.type);
    }
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        if ((scanResult instanceof Error))
            return;
        this.scannedObjects = scanResult.map((reading) => {
            let type = 'Other';
            let certainty = 0.5;
            let distance = undefined;
            let mass = undefined;
            if (reading.gravity < 0) {
                type = 'WarpGate';
                certainty = 1;
                mass = -100;
                distance = reading.gravity / mass;
            }
            else if (reading.gravity < 1) {
                type = 'Asteroid';
                mass = 5;
                distance = reading.gravity / mass;
            }
            return {
                angle: reading.heading,
                type,
                certainty,
                mass,
                distance,
            };
        });
        this.target = scanResult[0];
    }
}
// accurate vector coordinates (angle, distance) of warpgates and planets - navigation
// angle (from velocity), heading, velocity, distance of asteroids - defense
// passive scan - heading, mass/distance - warpgates accurate position, list of objects of certain planets + list of objects of uncertain planets 
// meteor - mass = 1, radius = 5
// asteroid - mass = 5, radius = 15
// warpgate - mass = -100, radius = 15
// planet - mass = r^3*PI/10 (1060 ~ 13463), radius = 15 ~ 35
// distance (540, 720) - farthest distance = 900
// gravity = mass/distance (planet gravity > 1)
// active scan - angle(heading), distance, velocity, radius
// close range - type, habitability
