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
		const force = 1.5
		console.log(headingDiff)


		if(headingDiff < -0.30)
		{
			setThruster('clockwise', force)
		}
		else if(headingDiff > -0.30 && headingDiff < 0)
		{
			setThruster('clockwise', 0)
			setThruster('counterClockwise', force + 0.1)
		}
		else if(headingDiff >= 0)
		{
			setThruster('counterClockwise', 0)
		}


		setThruster('main', Math.abs(headingDiff) < 0.08 ? 40 : 0)
	}
}
