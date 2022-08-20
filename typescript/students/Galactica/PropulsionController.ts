import { Vector2, withinPiRange } from '../helpers.js'
import PropulsionController from '../../src/subsystems/propulsionController.js'
import { setThrustersType } from '../types.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourSensorsController from './SensorsController.js'
export default class YourPropulsionController extends PropulsionController {
	// To get other subsystem information, use the attributes below.
	defence?: YourDefenceController
	sensors?: YourSensorsController
	navigation?: YourNavigationController

	//Add additional attributes here

	propulsionUpdate(setThrusters: setThrustersType) {
		//Student code goes here
	}
}
