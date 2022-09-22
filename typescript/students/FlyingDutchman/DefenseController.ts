import DefenceController from '../../src/subsystems/defenceController.js'
import { Vector2, withinPiRange, angleDiff } from '../helpers.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController, { SpaceObject } from './SensorsController.js'
export default class YourDefenceController extends DefenceController {
	// To get other subsystem information, use the attributes below. 
	// @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	propulsion: YourPropulsionController
	
	//Add additional attributes here

	// the number of asteroids that have been targeted already
	hitAsteroid: number = 0;

	//will be incremented as to use up all of the tubes then go back to 0
	curTube: number = 0;
	
	
	defenceUpdate(aimTurret: (angle: number) => void, getTubeCooldown: (i: number) => number | Error, fireTorpedo: (i: number) => Error | null) {

		// we have four torpedos that can be shot at one time
		// we get angle, distance, heading and velocity of the aseteroids from the sensors

		// pseudocode
		// if an asteroid is within x distance from our heading, aim and fire at it

		
		if (!this.sensors.target) return
		
		let asteroidList: SpaceObject[] = []
		let asteroid: SpaceObject;
		let shipPos: Vector2
		
		asteroidList = this.sensors.asteroids;

		// console.log(this.sensors.asteroids);
		// console.log(getTubeCooldown(0), getTubeCooldown(1), getTubeCooldown(2), getTubeCooldown(3));

		// for loop that constantly checks the distance of all of the asteroids


		if(this.hitAsteroid < this.sensors.asteroids.length) {
			
			asteroid = this.sensors.asteroids[this.hitAsteroid];
			
			if(getTubeCooldown(this.hitAsteroid) == 0) {
				console.log(asteroid.distance)
				if (asteroid.distance != undefined && asteroid.distance < 1) {
					aimTurret(asteroid.angle);
					fireTorpedo(this.curTube);
	
					this.curTube = (this.curTube+1)%4;
					//will have to fix this -> premature update of the hitAsteroid variable
					this.hitAsteroid++
				}

			}

		}

		


		

		


	}
}
