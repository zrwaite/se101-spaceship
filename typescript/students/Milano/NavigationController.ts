import { Vector2 } from '../helpers.js'
import { MapData, ShipStatus} from '../types.js'

import NavigationController from '../../src/subsystems/navigationController.js'
import YourDefenceController from './DefenseController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'
import { getMapData } from '../../src/ship/mapData.js'

//Testing 
export default class YourNavigationController extends NavigationController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	propulsion: YourPropulsionController

	//Add additional attributes here
	shipData: number[] = []
	

	navigationUpdate(getShipStatus: (key: keyof ShipStatus) => number, warp: () => Error|null, land: () => Error|null, getMapData: () => MapData) {
		
		//hello
		while (true){
			this.shipData[0] = getShipStatus('radius')
			this.shipData[1] = getShipStatus('angularVelocity')
			this.shipData[2] = getShipStatus('angle')
			this.shipData[3] = getShipStatus('positionX')
			this.shipData[4] = getShipStatus('positionY')
			this.shipData[5] = getShipStatus('linearVelocityX')
			this.shipData[6] = getShipStatus('linearVelocityY')
			this.shipData[7] = getShipStatus('thrusterPowerMain')
			this.shipData[8] = getShipStatus('thrusterPowerBow')
			this.shipData[9] = getShipStatus('thrusterPowerClockwise')
			this.shipData[10] = getShipStatus('thrusterPowerCounterClockwise')
			land()
			warp()
			
		}
	
	
	}
	
}
