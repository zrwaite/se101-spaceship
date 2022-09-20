import { angleDiff, Vector2, withinPiRange } from '../helpers.js'
import { ThrusterName } from '../types.js'
import PropulsionController from '../../src/subsystems/propulsionController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourSensorsController from './SensorsController.js'

export default class YourPropulsionController extends PropulsionController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	navigation: YourNavigationController

	//Add additional attributes here

	propulsionUpdate(setThruster: (thruster: ThrusterName, power: number) => Error | null) {
		if (!this.sensors.target) return
		const headingDiff = withinPiRange(angleDiff(this.navigation.angle, this.sensors.target.heading))
		const force = Math.min(100*Math.abs(headingDiff), 10)
		console.log(headingDiff)
		setThruster('main', force)
		if (headingDiff < 0 && Math.abs(headingDiff) >= 0.5) {
			setThruster('clockwise', force)
			setThruster('counterClockwise', 0)
		} else if (headingDiff > 0 && Math.abs(headingDiff) >= 0.5) {
			setThruster('counterClockwise', force)
			setThruster('clockwise', 0)
		} else { 
			setThruster('counterClockwise', 0)
			setThruster('clockwise', 0)
		}

		setThruster('main', Math.abs(headingDiff) < 0.5 ? 50 : 0)
	}
}
