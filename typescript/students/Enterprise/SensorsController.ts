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
  closeRangeObject: string | null = null;
	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
		const scanResult = passiveScan();
    const activeResult = this.target ? activeScan(this.target.heading - 3.14/6, 3.14/3, 200) : new Error("not ready");
    if(!(scanResult instanceof Error)) this.target = scanResult[0];
    if(!(activeResult instanceof Error) && activeResult[0]?.closeRange) {
      this.closeRangeObject = activeResult[0].closeRange.type;
    }
    this.closeRangeObject && console.log(this.closeRangeObject);
  }
}
