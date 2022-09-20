import { Vector2, withinPiRange, angleDiff } from '../helpers.js'
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
		//Student code goes here

		if (!this.sensors.target) return
		const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading)
		const turnForce = Math.min(Math.abs(50 * headingDiff), 20)

		let mainForce = 80;
		let bowForce = 0;
		if (this.sensors.targetDistance != 0 
			&& this.sensors.targetDistance < 200 
			&& this.sensors.targetType == "Planet") {
			console.log("hey");
			mainForce = 0
			bowForce = 100;
		}

		if (headingDiff < 0) {
			setThruster('clockwise', turnForce)
			setThruster('counterClockwise', 0)
		}
		else {
			setThruster('counterClockwise', turnForce)
			setThruster('clockwise', 0)
		}
		setThruster('main', Math.abs(headingDiff) < 0.20 ? mainForce : 0)
		setThruster('bow', bowForce)
	}
}
