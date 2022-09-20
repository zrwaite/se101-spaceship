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
		const force = 1
		console.log(headingDiff)


		if(headingDiff != 0)
		{	
			if(headingDiff < -0.3)
			{
				setThruster('clockwise', force)
				console.log("accelerating")
			}
			else if(headingDiff >= -0.3)
			{
				setThruster('counterClockwise', force)
				console.log("decelerating")
			}
		}

		setThruster('main', Math.abs(headingDiff) < 0.2 ? 100 : 0)
	}
}
