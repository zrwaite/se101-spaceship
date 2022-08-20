import DefenceController from '../../src/subsystems/defenceController.js'
import { Vector2, withinPiRange, angleDiff } from '../helpers.js'
import { aimTurretType, getTubeCooldownType, fireTorpedoType } from '../types.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'
export default class YourDefenceController extends DefenceController {
	// To get other subsystem information, use the attributes below.
	navigation?: YourNavigationController
	sensors?: YourSensorsController
	propulsion?: YourPropulsionController

	//Add additional attributes here
	
	defenceUpdate(aimTurret: aimTurretType, getTubeCooldown: getTubeCooldownType, fireTorpedo: fireTorpedoType) {
		//Student code goes here
	}
}
