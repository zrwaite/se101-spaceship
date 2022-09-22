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
	hitAsteroid: number = 0;
	curTube: number = 0;
	
	
	defenceUpdate(aimTurret: (angle: number) => void, getTubeCooldown: (i: number) => number | Error, fireTorpedo: (i: number) => Error | null) {

		// we have four torpedos that can be shot at one time
		// we get angle, distance, heading and velocity of the aseteroids from the sensors

		// pseudocode
		// if an asteroid is within x distance from our heading, aim and fire at it

		//defence push

		
		if (!this.sensors.target) return
		
		let asteroidList: SpaceObject[] = []
		let asteroid: SpaceObject;
		let shipPos: Vector2
		
		asteroidList = this.sensors.asteroids;

		console.log(this.sensors.asteroids);
		console.log(getTubeCooldown(0), getTubeCooldown(1), getTubeCooldown(2), getTubeCooldown(3));



		if(this.hitAsteroid < this.sensors.asteroids.length) {
			
			asteroid = this.sensors.asteroids[this.hitAsteroid];
			
			if(getTubeCooldown(this.hitAsteroid) == 0) {
				aimTurret(asteroid.angle);
				fireTorpedo(this.hitAsteroid);

				this.hitAsteroid = (this.hitAsteroid+1)%4;
				this.hitAsteroid++;
			}

		}

		


		

		


	}
}
