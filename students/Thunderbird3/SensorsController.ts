import SensorsController from '../../src/subsystems/sensorsController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import { ShipStatus, activeScanType, passiveScanType } from '../types.js'
import { Vector2 } from '../helpers.js'

export default class YourSensorsController extends SensorsController {
	// To get other subsystem information, use the attributes below.
	defence?: YourDefenceController
	navigation?: YourNavigationController
	propulsion?: YourPropulsionController
	// Define additional attributes here
	sensorsUpdate(shipStatusInfo: ShipStatus, activeScan: activeScanType, passiveScan: passiveScanType) {
		//Student code goes here
	}
}
