import { Vector2, withinPiRange } from '../helpers.js'
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
			const angleDiff = withinPiRange(shipStatusInfo.angle - this.sensors.idealHeading)
			if (shipStatusInfo.angularVelocity > 0.03) {
				console.log('too fast')
				this.clockwise = 0
				this.counterClockwise = 100
			} else if (shipStatusInfo.angularVelocity < -0.03) {
				console.log('too fast')
				this.clockwise = 100
				this.counterClockwise = 0
			} else if (Math.abs(shipStatusInfo.angularVelocity) < 0.02) {
				if (angleDiff < 0) {
					this.clockwise = Math.abs(shipStatusInfo.angularVelocity * 500 + angleDiff * 50)
					this.counterClockwise = 0
				} else {
					this.clockwise = 0
					this.counterClockwise = shipStatusInfo.angularVelocity * 500 + angleDiff * 50
				}
				if (this.sensors.planetAhead) {
					setThrusters('main', this.sensors.planetDistance / 2)
				} else setThrusters('main', 20)
			}
			setThrusters('clockwise', this.clockwise)
			setThrusters('counterClockwise', this.counterClockwise)
		}
		//Student code goes here
	}
}
