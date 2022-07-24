import { withinPiRange, Vector2 } from '../helpers.js'
import SensorsController from '../../src/subsystems/sensorsController.js'
import { ShipStatus, activeScanType, passiveScanType } from '../types.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
export default class YourSensorsController extends SensorsController {
	// To get other subsystem information, use the attributes below.
	defence?: YourDefenceController
	navigation?: YourNavigationController
	propulsion?: YourPropulsionController
	asteroidAhead = false
	asteroidDirection: number = 0
	timer = 0
	planetAhead = false
	planetDistance = 0
	planetDirection = 0
	sensorsUpdate(shipStatusInfo: ShipStatus, activeScan: activeScanType, passiveScan: passiveScanType) {
	}
}