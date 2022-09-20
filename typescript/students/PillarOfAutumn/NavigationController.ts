import { Vector2 } from '../helpers.js'
import { MapData, ShipStatus} from '../types.js'

import NavigationController from '../../src/subsystems/navigationController.js'
import YourDefenceController from './DefenseController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'
let planet = false;
let portal = false;

export default class YourNavigationController extends NavigationController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	propulsion: YourPropulsionController
	angle: number = 0

	navigationUpdate(getShipStatus: (key: keyof ShipStatus) => number, warp: () => Error|null, land: () => Error|null, getMapData: () => MapData) {
		this.angle = getShipStatus('angle')
			//figure out how to read mapdata
		land();
		warp();
		getMapData();
		if (planet) {
			console.log("PLEASE")
			land();
			planet = false;
		}
		if (portal){
			warp();
			portal = false;
		}
	}
}
