import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.G = 1.0 / 3;
        this.SHIP_MASS = 3;
        this.ASTEROID_MASS = 5;
    }
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        if (!this.sensors.target)
            return;
        if (this.shouldShoot(this.sensors.target)) {
            aimTurret(this.sensors.target.heading);
            fireTorpedo(0);
        }
    }
    //determine whether or not ship should shoot
    shouldShoot(target) {
        if (target === null || target.gravity < 0) {
            return false;
        }
        let estimatedRadius = Math.sqrt(this.G * this.SHIP_MASS * this.ASTEROID_MASS / target.gravity);
        return estimatedRadius < 5;
    }
}
