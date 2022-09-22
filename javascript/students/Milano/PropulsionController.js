import { angleDiff } from '../helpers.js';
import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        /**
         * Has information from defence controller, sensors and navigation
         *
         * The purpose of the PropulsionController is to use power efficiently so that the ship is able to navigate towards a particular object and contact the
         * 	defense controller if a missile needs to be destroyed
         *
         * Only available API call is to the setThruster = set thrust level of each of the rocket ship's thrusters
         *
         * All Available API methods:
         *
         * Defence:
         * 	aimTurret: Aim the ship's torpedo turret
         * 	getTubeCooldown: Get the time until one of your 4 turret tubes can be fired again
         * 	fireTorpedo: Attempt to fire a torpedo out of one of the 4 turret tubes
         * Navigation:
         * 	warp: Attempt to use the quantum fluxtinator to travel through a nearby warp gate
         * 	land: Attempt to land on a nearby planet
         * 	mapData: Get the data about your current solar system
         * Propulsion:
         * 	setThrusters: Set the thrust level of each of the ship's thrusters
         * Sensors:
         * 	activeScan: Use an expensive, precise sensor to read data about all space objects
         * 				in the range you define
         * 	passiveScan: Use low-cost, imprecise sensors to read data about some space objects
         * 				 in the solar system
         *
         */
        if (!this.sensors.target)
            return;
        //One line to aim where it needs to aim
        //Need to account for angular velocity from navigation
        //Don't push to left if you are already heading in that direction
        //Scale by 15000 and then you'll end going straight
        const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading);
        const force = Math.min(Math.abs(100 * headingDiff), 100);
        if (headingDiff < 0) {
            setThruster('clockwise', force);
            setThruster('counterClockwise', 0);
        }
        else {
            setThruster('counterClockwise', force);
            setThruster('clockwise', 0);
        }
        setThruster('main', Math.abs(headingDiff) < 0.2 ? 30 : 0);
    }
}
