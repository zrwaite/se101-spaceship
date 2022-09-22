import { withinPiRange, Vector2 } from '../helpers.js'
import SensorsController from '../../src/subsystems/sensorsController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import { EMSReading, PassiveReading } from '../types.js'
type Destination = {
	type: string;
	radius: number;
	mass: number;
}
export default class YourSensorsController extends SensorsController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	propulsion: YourPropulsionController


	//Add additional attributes here
	target: PassiveReading | null = null;
  closeRangeObject: EMSReading[] | null = null;
	ready: boolean = false;
	destinations: Destination[] | null = null;



	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
	
		const scanResult = passiveScan();

		const activeResult = this.target ? activeScan(this.target.heading - 3.14/2, 3.14, 200) : new Error("not ready");
		if(!(scanResult instanceof Error)) {		
			// if(!this.ready) {
			// 	for (const item of scanResult) {
			// 		let initActiveRes = activeScan(item.heading - 3.14/10000, 3.14/5000, 720)
			// 		if(!(initActiveRes instanceof Error)) {
			// 			for (const spaceObj of initActiveRes) {
			// 				if(spaceObj.radius > 25 && spaceObj.radius < 45 && spaceObj.distance * item.gravity > 2500) {
								
			// 				}
			// 			}
			// 		}
			// 	}
			// }
			// else	
			this.target = scanResult[0];
		}
    if(!(scanResult instanceof Error)) this.target = scanResult[0];
		if(!(activeResult instanceof Error)) {
		  this.closeRangeObject = activeResult;
		}
  }
}
