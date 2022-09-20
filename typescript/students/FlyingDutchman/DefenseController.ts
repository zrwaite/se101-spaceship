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

		// let angle: number = 10;
		// let distance: number = 10;
		// let heading: number = (-3*3.14/4)
		// const aestroid_velocity = new Vector2(5,7);

		
		// let avx: number = 10
		// let avy: number = 50
		// let ady: number = 30
		// let adx: number = 20
		// let tv: number = 3
		// let sdx: number = 234
		// let sdy: number = 23

		// let theta1: number
		// let theta2: number
		// let numerator1: number
		// let numerator2: number
		// let denominator: number
		// let B: number = (avx*(ady-sdx)-avy*(adx-sdx))
		// numerator1 = (-2*B*(adx-sdx) * tv + (4*B**2 * (adx-sdx)**2 * tv**2 - 4*(B**2 - (ady-sdx)**2 * tv**2)*(ady-sdx)**2 * tv**2 + (adx-sdx)**2 * tv**2)**(0.5))
		// numerator2 = (-2*B*(adx-sdx) * tv - (4*B**2 * (adx-sdx)**2 * tv**2 - 4*(B**2 - (ady-sdx)**2 * tv**2)*(ady-sdx)**2 * tv**2 + (adx-sdx)**2 * tv**2)**(0.5))
		// denominator = 2*((ady-sdx)**2 * tv**2 + (adx-sdx)**2 * tv**2)

		// // console.log(numerator1)
		// // console.log(denominator)
		// theta1 = Math.asin(numerator1/denominator)
		// theta2 = Math.asin(numerator2/denominator)

		// console.log(theta1)
		// console.log(theta2)

		
		if (!this.sensors.target) return
		aimTurret(this.sensors.target.heading)

	}
}
