import { withinPiRange, Vector2 } from '../helpers.js'
import SensorsController from '../../src/subsystems/sensorsController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import { EMSReading, PassiveReading } from '../types.js'
export default class YourSensorsController extends SensorsController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	propulsion: YourPropulsionController

	//Add additional attributes here
	target: PassiveReading | null = null;
<<<<<<< HEAD
	closeRange :EMSReading[] | null=null
=======
	closeRange: EMSReading[] | null = null;
>>>>>>> 89bca9a108f37393d60dc8aaeb5c3dc15fc48409

	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
		
		const scanResult = passiveScan();
<<<<<<< HEAD
		
		if (!(scanResult instanceof Error)){
			this.target = scanResult[0];
			var activeScanResult= activeScan(2,1,2)
			
			if(!(activeScanResult instanceof Error)){
				for(var reading in activeScanResult){
					
				}
			}
			else{
				throw activeScanResult
			}
		}
		
		
		
		
=======
		if (!(scanResult instanceof Error)) {
			this.target = scanResult[0];
			const activeScanData = activeScan(this.target.heading - 1, 2, 300);

			if(!(activeScanData instanceof Error)) {

				this.closeRange = activeScanData
				console.log(this.closeRange)
			}
		}

>>>>>>> 89bca9a108f37393d60dc8aaeb5c3dc15fc48409
	}
}
