import { withinPiRange, Vector2 } from '../helpers.js'
import SensorsController from '../../src/subsystems/sensorsController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import { EMSReading, PassiveReading } from '../types.js'

let allObjects: object[] = []; // array of all objects in galaxy

export default class YourSensorsController extends SensorsController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	propulsion: YourPropulsionController
	target: PassiveReading | null=null

	//Add additional attributes here

	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
		const scanResult = passiveScan()

		if (!(scanResult instanceof Error)) {
			// checks if scan object already exists in allObjects
			// if it does, that object is the planet
			allObjects.forEach(planet => {
				if(JSON.stringify(planet) == JSON.stringify(scanResult)){
					console.log("found the planet", scanResult[0])					
					this.target = scanResult[0] // sets target to planet
				}
			});

			allObjects.push(scanResult) // adds object to array
		}
		//this is a test
	}
}
