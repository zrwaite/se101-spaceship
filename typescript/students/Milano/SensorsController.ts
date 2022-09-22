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
	target: PassiveReading | null = null;
	emsReading: EMSReading[] | Error = []

	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
		const scanResult = passiveScan();
		if(!(scanResult instanceof Error)) this.target = scanResult[0];
		
		//this.emsReading = activeScan(0, Math.PI, 500);
		//console.log(this.emsReading);

		/**
		 * Scanning Algorithm:
		 * First, split the map into smaller regions
		 * Then, utilizing any path algorithm, find the optimal path to leave the region
		 * and move onto the next region
		 * 	Also, check adjacent regions for:
		 * 		What objects are located in the regions beside them, and base the heading of the ship
		 * 		based on this information
		 * 		Also mark each region as travelled to unsure that the ship is not heading into the 
		 * 		same region
		 * 
		 * Repeat this algorithm until a warp gate or a planet is found
		 */
	}
}
