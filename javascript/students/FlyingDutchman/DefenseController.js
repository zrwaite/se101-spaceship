import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        // the number of asteroids that have been targeted already
        this.hitAsteroid = 0;
        //will be incremented as to use up all of the tubes then go back to 0
        this.curTube = 0;
        this.firing = false;
    }
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        // we have four torpedos that can be shot at one time
        // we get angle, distance, heading and velocity of the aseteroids from the sensors
        // pseudocode
        // if an asteroid is within x distance from our heading, aim and fire at it
        if (!this.sensors.target)
            return;
        let asteroidList = [];
        let asteroid;
        let shipPos;
        asteroidList = this.sensors.asteroids;
        // console.log(this.sensors.asteroids);
        // console.log(getTubeCooldown(0), getTubeCooldown(1), getTubeCooldown(2), getTubeCooldown(3));
        // for loop that constantly checks the distance of all of the asteroids
        if (this.firing) {
            fireTorpedo(this.curTube);
            this.curTube++;
            if (this.curTube == 4) {
                this.firing = false;
                this.curTube = 0;
            }
        }
        else if (this.hitAsteroid < this.sensors.asteroids.length) {
            asteroid = this.sensors.asteroids[this.hitAsteroid];
            if (getTubeCooldown(this.hitAsteroid) == 0) {
                console.log(asteroid.distance);
                if (asteroid.distance != undefined && asteroid.distance < 1) {
                    aimTurret(asteroid.angle);
                    fireTorpedo(this.curTube);
                    this.curTube = (this.curTube + 1) % 4;
                    //will have to fix this -> premature update of the hitAsteroid variable
                    this.hitAsteroid++;
                    this.firing = true;
                }
            }
        }
    }
}
