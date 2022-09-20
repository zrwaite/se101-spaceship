import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        this.target = null;
    }
    //Add additional attributes here
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error))
            this.target = scanResult[0];
    }
}
// accurate vector coordinates (angle, distance) of warpgates and planets - navigation
// angle, heading, velocity, distance of asteroids - defense
// passive scan - heading, mass/distance - warpgates accurate position
// active scan - angle, distance, velocity, radius
// close range - type, habitability
