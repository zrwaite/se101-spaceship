import { Vector2 } from '../helpers.js'
import { getShipStatusType, tryWarpType, MapData, tryLandType} from '../types.js'

import NavigationController from '../../src/subsystems/navigationController.js'
import YourDefenceController from './DefenseController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'

export default class YourNavigationController extends NavigationController {
	// To get other subsystem information, use the attributes below.
	defence?: YourDefenceController
	sensors?: YourSensorsController
	propulsion?: YourPropulsionController

	//Add additional attributes here

	navigationUpdate(getShipStatus: getShipStatusType, warp: tryWarpType, land: tryLandType, getMapData: () => MapData) {
		//Student code goes here
	}
}
