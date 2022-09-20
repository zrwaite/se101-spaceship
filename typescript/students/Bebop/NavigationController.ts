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

	//Add additional attributes here
	radius = 0;
	angularVelocity = 0;
	angle = 0;
	positionX = 0;
	positionY = 0;
	linearVelocityX = 0;
	linearVelocityY = 0;
	thrusterPowerMain = 0;
	thrusterPowerBow = 0;
	thrusterPowerClockwise = 0;
	thrusterPowerCounterClockwise = 0;

	navigationUpdate(getShipStatus: (key: keyof ShipStatus) => number, warp: () => Error|null, land: () => Error|null, getMapData: () => MapData) {
		// Update attributes (currently don't know which ones are needed by other subsystems)
		
		// this.radius = getShipStatus('radius');
		// this.angularVelocity = getShipStatus('angularVelocity');
		this.angle = getShipStatus('angle');
		// this.positionX = getShipStatus('positionX');
		// this.positionY = getShipStatus('positionY');
		// this.linearVelocityX = getShipStatus('linearVelocityX');
		// this.linearVelocityY = getShipStatus('linearVelocityY');
		// this.thrusterPowerMain = getShipStatus('thrusterPowerMain');
		// this.thrusterPowerBow = getShipStatus('thrusterPowerBow');
		// this.thrusterPowerClockwise = getShipStatus('thrusterPowerClockwise');
		// this.thrusterPowerCounterClockwise = getShipStatus('thrusterPowerCounterClockwise');


		/*plan: sense for objects, if there is an object:
		 if the object is a planet, land, 
		 if it is a warp, warp
		 otherwise, do nothing (for now)
		 */
		land();
	}
}
