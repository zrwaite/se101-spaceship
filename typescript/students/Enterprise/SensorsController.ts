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
	targets: Array<{heading: number, guess: string}> = [];
  closeRangeObject: EMSReading[] | null = null;
	ready: boolean = false;
	destinations: Destination[] | null = null;



	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
	
		const scanResult = passiveScan();

		const activeResult = activeScan(this.navigation.angle - 3.14/2, 3.14, 200);
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
		}
    if(!(scanResult instanceof Error)) {
      scanResult.forEach((target, idx) => {
        const heading = target.heading;
        const guess = target.gravity < 0 ? "WarpGate" : "Planet";
        this.targets[idx] = {heading: heading, guess: guess};
      })
    }
		if(!(activeResult instanceof Error)) {
		  this.closeRangeObject = activeResult;
		}
  }
}
