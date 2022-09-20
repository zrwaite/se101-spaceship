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

	spaceObjects: EMSReading | null = null
	targetDistance = 0
	
	// helper function to convert degrees to radians
	rad(angleDeg: number){
		return angleDeg * Math.PI / 180;
	}

	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
		const passiveScanResult = passiveScan()
		if (!(passiveScanResult instanceof Error)) console.log(passiveScanResult)
		if (!(passiveScanResult instanceof Error)) this.target = passiveScanResult[0] //reading first object that passiveScan scans

		const activeScanResult = activeScan(this.navigation.angle-this.rad(10), this.rad(20), 400) // Lower range for energy efficiency
		if (!(activeScanResult instanceof Error)) console.log(activeScanResult)
		if (!(activeScanResult instanceof Error)){ 
			if (activeScanResult.length > 0){
				//
				this.targetDistance = activeScanResult[0].distance //finding distance to first object activeScan scans
			}
		}
		
		// console.log(this.targetDistance)
	}

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
}
