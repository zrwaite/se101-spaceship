import { Vector2, withinPiRange } from '../helpers.js'
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
		if(!this.sensors.target) return
		const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading)
		const force = Math.min(Math.abs(500*headingDiff), 100)
		if(headingDiff<0){
			setThruster('clockwise', force)
			setThruster('counterClockwise',0)
		}else{
			setThruster('counterClockwise',force)
			setThruster('clockwise', 0)
			
		}

		setThruster('main',Math.abs(headingDiff)<0.2? 30 : 0)
	}
}
