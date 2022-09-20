import DefenceController from '../../src/subsystems/defenceController.js';
import { Vector2 } from '../helpers.js';
export default class YourDefenceController extends DefenceController {
    //Add additional attributes here
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        // we have four torpedos that can be shot at one time
        // we get angle, distance, heading and velocity of the aseteroids from the sensors
        // pseudocode
        // if an asteroid is within x distance from our heading, aim and fire at it
        let angle = 10;
        let distance = 10;
        let heading = (-3 * 3.14 / 4);
        let asteroidList = [];
        let asteroid;
        let shipPos;
        const aestroid_velocity = new Vector2(5, 7);
        if (!this.sensors.target)
            return;
        asteroidList = this.sensors.asteroids;
        asteroid = this.sensors.asteroids[0];
        console.log(asteroid.angle);
        //aimTurret(asteroid.angle)
        //fireTorpedo(1)
    }
}
