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

	
	defenceUpdate(aimTurret: (angle: number) => void, getTubeCooldown: (i: number) => number | Error, fireTorpedo: (i: number) => Error | null) {

		// we have four torpedos that can be shot at one time
		// we get angle, distance, heading and velocity of the aseteroids from the sensors

		// pseudocode
		// if an asteroid is within x distance from our heading, aim and fire at it

		let angle: number = 10;
		let distance: number = 10;
		let heading: number = (-3*3.14/4)
		let asteroidList: SpaceObject[] = []
		let asteroid: SpaceObject;
		let shipPos: Vector2
		const aestroid_velocity = new Vector2(5,7);
		
		if (!this.sensors.target) return
		
		
		asteroidList = this.sensors.asteroids;
		asteroid = this.sensors.asteroids[0];

		console.log(asteroid.angle)

		

		//aimTurret(asteroid.angle)
		//fireTorpedo(1)


	}
}
