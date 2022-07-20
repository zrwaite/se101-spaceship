import DefenceController from '../../src/subsystems/defenceController.js'
import { Vector2 } from '../helpers.js'
import { ShipStatus, aimTurretType, getTubeCooldownType, fireTorpedoType } from '../types.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'
export default class YourDefenceController extends DefenceController {
	// To get other subsystem information, use the attributes below.
	navigation?: YourNavigationController
	sensors?: YourSensorsController
	propulsion?: YourPropulsionController

	torpedoDelay = 0
	defenceUpdate(shipStatusInfo: ShipStatus, aimTurret: aimTurretType, getTubeCooldown: getTubeCooldownType, fireTorpedo: fireTorpedoType) {}
}
