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
	postAftThrusterLevel = 0
	starboardAftThrusterLevel = 0

	propulsionUpdate(shipStatusInfo: ShipStatus, setThrusters: setThrustersType) {
		// if (this.sensors) {
		// 	if (shipStatusInfo.angle > this.sensors.idealHeading) {
		// 		this.postAftThrusterLevel += 10
		// 		this.starboardAftThrusterLevel = 0
		// 	} else {
		// 		this.postAftThrusterLevel = 0
		// 		this.starboardAftThrusterLevel += 10
		// 	}
		// 	setThrusters('portAftThruster', this.postAftThrusterLevel)
		// 	setThrusters('starboardAftThruster', this.starboardAftThrusterLevel)
		// 	if (shipStatusInfo.linearVelocity.magnitude() < 1) {
		// 		setThrusters('mainThruster', 100)
		// 	}
		// }
		// console.log(this.postAftThrusterLevel + ", " + this.starboardAftThrusterLevel)
		// setThrusters('main', 100)

		//Student code goes here
	}
}
