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
	shipData1: number[] = []
	

	navigationUpdate(getShipStatus: (key: keyof ShipStatus) => number, warp: () => Error|null, land: () => Error|null, getMapData: () => MapData) {
		
		//hello
		while (true){
			this.shipData1[0] = getShipStatus('radius')
			this.shipData1[1] = getShipStatus('angularVelocity')
			this.shipData1[2] = getShipStatus('angle')
			this.shipData1[3] = getShipStatus('positionX')
			this.shipData1[4] = getShipStatus('positionY')
			this.shipData1[5] = getShipStatus('linearVelocityX')
			this.shipData1[6] = getShipStatus('linearVelocityY')
			this.shipData1[7] = getShipStatus('thrusterPowerMain')
			this.shipData1[8] = getShipStatus('thrusterPowerBow')
			this.shipData1[9] = getShipStatus('thrusterPowerClockwise')
			this.shipData1[10] = getShipStatus('thrusterPowerCounterClockwise')
			land()
			warp()
			
		}
	
	
	}
	
}
