import DefenceController from '../../src/subsystems/defenceController.js'
import { Vector2, withinPiRange, angleDiff } from '../helpers.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'
export default class YourDefenceController extends DefenceController {
	// To get other subsystem information, use the attributes below. 
	// @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	propulsion: YourPropulsionController
	timeCounter: number = 0
	//Add additional attributes here
	
	defenceUpdate(aimTurret: (angle: number) => void, getTubeCooldown: (i: number) => number | Error, fireTorpedo: (i: number) => Error | null) {

		console.log("defense: " + this.sensors.asteroidHeading)
		if(this.sensors.asteroidHeading.length > 0){
			let i = 0
			this.sensors.asteroidHeading.forEach((ast) => {
				if(i > 3){
				aimTurret(ast.angle)
				fireTorpedo(i)
				console.log(ast)
				i++
				}
				
			})
		}

		this.timeCounter++;
	}
}
