import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.hitAsteroid = 0;
        this.curTube = 0;
    }
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        // we have four torpedos that can be shot at one time
        // we get angle, distance, heading and velocity of the aseteroids from the sensors
        // pseudocode
        // if an asteroid is within x distance from our heading, aim and fire at it
        //defence push
        if (!this.sensors.target)
            return;
        let asteroidList = [];
        let asteroid;
        let shipPos;
        asteroidList = this.sensors.asteroids;
        console.log(this.sensors.asteroids);
        console.log(getTubeCooldown(0), getTubeCooldown(1), getTubeCooldown(2), getTubeCooldown(3));
        if (this.hitAsteroid < this.sensors.asteroids.length) {
            asteroid = this.sensors.asteroids[this.hitAsteroid];
            if (getTubeCooldown(this.hitAsteroid) == 0) {
                aimTurret(asteroid.angle);
                fireTorpedo(this.hitAsteroid);
                this.hitAsteroid = (this.hitAsteroid + 1) % 4;
                this.hitAsteroid++;
            }
        }
    }
}
