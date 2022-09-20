import { Vector2 } from '../helpers.js'
import { MapData, ShipStatus} from '../types.js'

import NavigationController from '../../src/subsystems/navigationController.js'
import YourDefenceController from './DefenseController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'

export default class YourNavigationController extends NavigationController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	propulsion: YourPropulsionController
	angle=0; //initializes angle
	
	
	navigationUpdate(getShipStatus: (key: keyof ShipStatus) => number, warp: () => Error|null, land: () => Error|null, getMapData: () => MapData) {
		const closeRangeObject = this.sensors.closeRangeObject;

		// Landing if the distance between the spaceship and A planet is less than 20
		if (closeRangeObject?.closeRange && closeRangeObject.closeRange.type === 'Planet' && closeRangeObject.distance < 20) {
			land();
		}
		
		this.angle = getShipStatus("angle");
	}
}
