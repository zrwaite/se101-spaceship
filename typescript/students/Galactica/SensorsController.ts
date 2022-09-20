import { withinPiRange, Vector2 } from '../helpers.js'
import SensorsController from '../../src/subsystems/sensorsController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import { EMSReading, PassiveReading } from '../types.js'

interface SpaceObjectDetailed {
	type: string
	angle: number
}

export default class YourSensorsController extends SensorsController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	propulsion: YourPropulsionController

	//Add additional attributes here
	target: PassiveReading | null = null	
	spaceObjects: EMSReading | null = null
	spaceObjectsDetailed: SpaceObjectDetailed[] | null = null
	targetDistance = 0
	activeArray = new Array<EMSReading>(4);
	facing = ""

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
				this.activeArray = activeScanResult;
				this.targetDistance = activeScanResult[0].distance //finding distance to first object activeScan scans
			}
		}

		//Update Space Info, not 100% reliable, if there headings are very similar
		if (!(passiveScanResult instanceof Error) && !(activeScanResult instanceof Error)){
			this.spaceObjectsDetailed = [];
			for (var passiveSpaceObject of passiveScanResult){
				for (var activeSpaceObject of activeScanResult){
					if ((passiveSpaceObject.heading - activeSpaceObject.angle) < 1){
						var gravity = passiveSpaceObject.gravity
						var radius = activeSpaceObject.radius 

						var mass = gravity * radius * radius;
						var spaceObjectType = "Unknown";

						if (mass < 0){
							spaceObjectType = "WarpGate"
						}
						if (0 <= mass && mass <= 2){
							spaceObjectType = "Meteor"
						}
						if (3 <= mass && mass <= 7){
							spaceObjectType = "Asteroid"
						}
						if (2300 <= mass && mass <= 30000){
							spaceObjectType = "Planet";
						}
						if (31000 <= mass && mass <= 44000){
							spaceObjectType = "Star";
						}
						//Not bothering with Blackhole
						
						// Each detailed space object will have the information of type and angle
						this.spaceObjectsDetailed.push(<SpaceObjectDetailed> { type: spaceObjectType, angle: activeSpaceObject.angle })
					}
				}
			}
		}
		console.log("Details")
		console.log(this.spaceObjectsDetailed)

		if (this.spaceObjectsDetailed != null){
			this.facing = this.spaceObjectsDetailed[0].type;
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