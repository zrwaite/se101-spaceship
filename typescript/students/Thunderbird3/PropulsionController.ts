import PropulsionController from '../../src/subsystems/propulsionController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourSensorsController from './SensorsController.js'
import { ShipStatus, setThrustersType } from '../types.js'
import { Vector2 } from '../helpers.js'

export default class YourPropulsionController extends PropulsionController {
	// To get other subsystem information, use the attributes below.
	defence?: YourDefenceController
	sensors?: YourSensorsController
	navigation?: YourNavigationController
	// Define additional attributes here
	propulsionUpdate(shipStatusInfo: ShipStatus, setThrusters: setThrustersType) {
		//Student code goes here
	}
}
