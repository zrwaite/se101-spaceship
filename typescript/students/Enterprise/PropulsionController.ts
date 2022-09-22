import { Vector2, withinPiRange } from '../helpers.js'
import { ThrusterName } from '../types.js'
import PropulsionController from '../../src/subsystems/propulsionController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourSensorsController from './SensorsController.js'

import { angleDiff } from '../helpers.js'
export default class YourPropulsionController extends PropulsionController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	navigation: YourNavigationController

	//Add additional attributes here

	propulsionUpdate(setThruster: (thruster: ThrusterName, power: number) => Error | null) {
		if (!this.sensors.target) return

		const angularVelocity = this.navigation.angularVelocity;
		const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading)
		
		console.log("Heading Diff", headingDiff);
		console.log("Angular Velocity", angularVelocity);
		console.log("Force of heading diff", Math.abs(1500 * headingDiff))
		const force = Math.min(Math.abs(100 * headingDiff), 100);

		// Reaching headingDiff

		// set angle to the planet

		if (headingDiff < 0) {
			setThruster('clockwise', force);

		} else if (headingDiff > 0) {
			setThruster('counterClockwise', force);
		}

		// if (headingDiff < 0) {
		// 	setThruster('clockwise', force)
		// 	setThruster('counterClockwise', 0)
		// } else {
		// 	setThruster('counterClockwise', force)
		// 	setThruster('clockwise', 0)
		// }
		setThruster('main', Math.abs(headingDiff) < 0.7 ? 30 : 0)
	}
}
