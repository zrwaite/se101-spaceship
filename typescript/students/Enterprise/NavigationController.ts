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
	angularVelocity = 0; // initing angularvelocity
	
	
	navigationUpdate(getShipStatus: (key: keyof ShipStatus) => number, warp: () => Error|null, land: () => Error|null, getMapData: () => MapData) {
		const closeRangeObject = this.sensors.closeRangeObject;

		// Landing if the distance between the spaceship and A planet is less than 20
    closeRangeObject && closeRangeObject.forEach(object => {
      if(object?.closeRange){
        if(object.closeRange.type === 'Planet' && object.distance < 20) land();
        else if (object.closeRange.type === 'WarpGate' && object.distance < 20) warp();
      }
    });
		
		this.angle = getShipStatus("angle");
		this.angularVelocity = getShipStatus('angularVelocity');
	}
}
