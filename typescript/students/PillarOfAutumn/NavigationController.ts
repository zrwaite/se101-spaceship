import { Vector2 } from '../helpers.js'
import { MapData, ShipStatus} from '../types.js'

import NavigationController from '../../src/subsystems/navigationController.js'
import YourDefenceController from './DefenseController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'
let planet = true;
let portal = true;

export default class YourNavigationController extends NavigationController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	propulsion: YourPropulsionController
	angle: number = 0
	angularVelocity: number = 0

	navigationUpdate(getShipStatus: (key: keyof ShipStatus) => number, warp: () => Error|null, land: () => Error|null, getMapData: () => MapData) {
		this.angle = getShipStatus('angle');
		this.angularVelocity = getShipStatus('angularVelocity')
			//figure out how to read mapdata
		land();
		warp();
		getMapData();
		if (planet) {
			land();
			planet = false;
		}
		if (portal){
			warp();
			portal = false;
		}
	}
}
