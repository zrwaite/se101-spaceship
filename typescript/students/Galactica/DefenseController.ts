import { couldStartTrivia } from '../../../node_modules/typescript/lib/typescript.js'
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
	//Add additional attributes here
	
	defenceUpdate(aimTurret: (angle: number) => void, getTubeCooldown: (i: number) => number | Error, fireTorpedo: (i: number) => Error | null) {
		//Student code goes here
		if (!this.sensors.target) return
		if (this.sensors.activeArray.length>0){
			for (let i =0; i<this.sensors.activeArray.length; i++ ){
					if(!(this.sensors.activeArray[i])) continue
					aimTurret(this.sensors.activeArray[i].angle)
					fireTorpedo(i%4)
			}
		}
		
		/** 
		if (this.sensors.activeArray.length>0){
			for (let i =0; i<this.sensors.activeArray.length; i++ ){
					if(!(this.sensors.activeArray[i])) continue
					let a = (3*this.sensors.activeArray[i].distance) * Math.cos(this.sensors.activeArray[i].angle)
					let b = (3*this.sensors.activeArray[i].distance) * Math.sin(this.sensors.activeArray[i].angle)
					let c = (this.sensors.activeArray[i].distance) * Math.sin(this.sensors.activeArray[i].angle)*()
					fireTorpedo(i%4)
			}
		}
		**/
	}
}
8