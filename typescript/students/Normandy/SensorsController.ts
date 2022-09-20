import { withinPiRange, Vector2 } from '../helpers.js'
import SensorsController from '../../src/subsystems/sensorsController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import { EMSReading, PassiveReading } from '../types.js'
import { isPrivateIdentifier } from '../../../node_modules/typescript/lib/typescript.js'
export default class YourSensorsController extends SensorsController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	propulsion: YourPropulsionController

	//Add additional attributes here
	target: PassiveReading | null = null
	passiveScans: (PassiveReading[] | Error)[] = []
	activeScans: (EMSReading[] | Error)[] = []
	
	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
		const scanResult = passiveScan()
		if(!(scanResult instanceof Error ))  {
			this.target = scanResult[0]	
			this.passiveScans.push(scanResult)
			console.log(this.passiveScans)
		}
		const activeResult = activeScan(0, Math.PI, 1000)
		if(!(activeResult instanceof Error ))  {	
			this.activeScans.push(activeResult)
			console.log(activeResult)
		}
		//console.log(activeResult)
	}	
}
















