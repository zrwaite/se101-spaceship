import { Vector2 } from '../helpers.js'
import PropulsionController from '../../src/subsystems/propulsionController.js'
import { ShipStatus, setThrustersType } from '../types.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourSensorsController from './SensorsController.js'
export default class YourPropulsionController extends PropulsionController {
	// To get other subsystem information, use the attributes below.
	defence?: YourDefenceController
	sensors?: YourSensorsController
	navigation?: YourNavigationController

	timer = 0
	clockwise = 0
	counterClockwise = 0

	propulsionUpdate(shipStatusInfo: ShipStatus, setThrusters: setThrustersType) {
		if (this.sensors) {
			console.log(shipStatusInfo.angle, this.sensors.idealHeading)
			if (shipStatusInfo.angle < this.sensors.idealHeading) {
				this.clockwise = 10
				this.counterClockwise = 0
			} else {
				this.clockwise = 0
				this.counterClockwise = 10
			}
			setThrusters('clockwise', this.clockwise)
			setThrusters('counterClockwise', this.counterClockwise)
			if (shipStatusInfo.linearVelocity.magnitude() < 1) {
				setThrusters('main', 20)
			}
		}
		// console.log(this.clockwise + ', ' + this.counterClockwise)
		// setThrusters('clockwise', 100)
		//Student code goes here
	}
}
