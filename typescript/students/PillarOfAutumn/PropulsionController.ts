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
		const angularVelocity = this.navigation.angularVelocity
		const force = Math.min(20 * Math.abs(headingDiff), 50)
		console.log(angularVelocity)

		/*
		propulsion
		get angular velocity from navigation
		if it's already going fast, turn opposite way faster
		also decrease speed when close to planet
		sensors 
		identify different planets
		defense
		only shoot when needed
		*/

		if (angularVelocity > 0.01) {
			setThruster('counterClockwise', 1500)
			setThruster('clockwise', 0)
		} else if (angularVelocity < -0.01) {
			setThruster('clockwise', 1500)
			setThruster('counterClockwise', 0)
		} else {
			// console.log(headingDiff)
			if (headingDiff < -0.5 && Math.abs(headingDiff) >= 0.5) {
				setThruster('clockwise', force)
				setThruster('counterClockwise', 0)
			} else if (headingDiff < -0.1) {
				setThruster('clockwise', force / 3)
				setThruster('counterClockwise', 0)
			} else if (headingDiff > 0.5 && Math.abs(headingDiff) >= 0.5) {
				setThruster('counterClockwise', force)
				setThruster('clockwise', 0)
			} else if (headingDiff > 0.5) {
				setThruster('counterClockwise', force / 3)
				setThruster('clockwise', 0)
			} else {
				if (angularVelocity > 0.005) { 
					setThruster('clockwise', 0)
					setThruster('counterClockwise', 20)
				} else if (angularVelocity < -0.005){
					setThruster('clockwise', 20)
					setThruster('counterClockwise', 0)
				} else { 
					setThruster('clockwise', 0)
					setThruster('counterClockwise', 0)
				}
			}
		}

		if (this.sensors.slowDown) {
			setThruster('bow', 100)
			setThruster('main', 0)
			this.sensors.slowDown = false;
		} else { 
			setThruster('main', 30)
			setThruster('bow', 0)
		}
	}
}
