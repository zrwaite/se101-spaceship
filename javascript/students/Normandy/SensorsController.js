import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
        this.landTarget = null;
    }
    collisionCheck(targetX, targetY, selfVelocity, targetVelocity) {
        return false;
    }
    cartesian(angle, distance) {
        // Given angle and distance of an object, return x,y cords assuming ship pos is 0,0
        return [distance * Math.cos(angle), distance * Math.sin(angle)];
    }
    polar(x, y) {
        // Given x,y coords assuming ship pos is 0,0, return [angle (in radians), distance]
        return [Math.sqrt(x * x + y * y), Math.atan(y / x)];
    }
    sensorsUpdate(activeScan, passiveScan) {
        //Student code goes here
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error)) {
            this.target = scanResult[0];
        }
    }
}
