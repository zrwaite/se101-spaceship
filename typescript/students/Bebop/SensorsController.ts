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
	passiveScanData: PassiveReading[] | null = null;
	activeScanData: EMSReading[] | null = null;

	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
		const scanResult = passiveScan();
		if (!(scanResult instanceof Error)) {
			this.target = scanResult[0];
			const activeScanData = activeScan(this.target.heading - Math.PI / 2, Math.PI, 1000);

			if(!(activeScanData instanceof Error)) {
				this.activeScanData = activeScanData;
			}
	
		}

	}
}
