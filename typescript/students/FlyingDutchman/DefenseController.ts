import DefenceController from '../../src/subsystems/defenceController.js'
import { Vector2, withinPiRange, angleDiff } from '../helpers.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'
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

		//defence push

		let angle: number = 10;
		let distance: number = 10;
		let heading: number = (-3*3.14/4)
		const aestroid_velocity = new Vector2(5,7);
		
		if (!this.sensors.target) return
		aimTurret(this.sensors.target.heading)

	}
}
