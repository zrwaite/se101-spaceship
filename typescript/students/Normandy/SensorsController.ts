import { withinPiRange, Vector2, angleDiff } from '../helpers.js'
import SensorsController from '../../src/subsystems/sensorsController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import { EMSReading, PassiveReading } from '../types.js'
//import { isPrivateIdentifier } from '../../../node_modules/typescript/lib/typescript.js'
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
	passiveCooldown: number = 0
	activeCooldown: number = 0
	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
		
		if (this.passiveCooldown <= 0) {
			const scanResult = passiveScan()
			if(!(scanResult instanceof Error ))  {
				this.target = scanResult[0]	
				this.passiveScans.push(scanResult)
				console.log(this.passiveScans)
			}
			this.passiveCooldown = 100
		}
		if (this.activeCooldown <= 0) {
			const activeResult = activeScan(0, 0.5, 50)
			if(!(activeResult instanceof Error ))  {	
				this.activeScans.push(activeResult)
				console.log(activeResult)
			}
			this.activeCooldown = 50
		}
		this.activeCooldown--
		this.passiveCooldown--
		//console.log(activeResult)
	}	
}
















