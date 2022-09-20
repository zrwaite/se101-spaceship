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
	target: PassiveReading | null = null	
    
    findMeteors(scanResults: EMSReading[] | Error) {
        var meteors: EMSReading[] = []
        if (scanResults instanceof Error) return
        for (var scanResult of scanResults) {
            if (!(scanResult.closeRange)) {
                return
            }
            if (scanResult.closeRange.type == 'Meteor') {
                meteors.push(scanResult)
            }
        }
        return meteors
    }

	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
		const scanResult = passiveScan()
		if (!(scanResult instanceof Error)) this.target = scanResult[0]
	}

    
}
