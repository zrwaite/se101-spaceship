import { Vector2, withinPiRange} from '../helpers.js'
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

	//Add additional attributes here
	angle = 0;
	shipVelocity = new Vector2(0, 0);
	shipPosition = new Vector2(0, 0);

	navigationUpdate(getShipStatus: (key: keyof ShipStatus) => number, warp: () => Error|null, land: () => Error|null, getMapData: () => MapData) {
		//Student code goes here
		//this.angle = getShipStatus('angle')
		//this.sensors.cartesian()

		this.shipVelocity = new Vector2(getShipStatus('linearVelocityX'), getShipStatus('linearVelocityY'))
		this.shipPosition = new Vector2(getShipStatus('positionX'), getShipStatus('positionY'))
		var landDest = this.sensors.landTarget		//absolute coordinates 


		if (landDest != null) {
			this.angle = withinPiRange((landDest.subtract(this.shipPosition)).angle())
		}
		
		// if (getShipStatus('positionX')) {
			
		// }

		//land();
	}
}
