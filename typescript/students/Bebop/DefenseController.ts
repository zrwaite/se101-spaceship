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
		if (!this.sensors.target) return
		if(this.sensors.activeScanData != null){
			for(let i = 0; i < this.sensors.activeScanData.length; i++){
				if(this.sensors.activeScanData[i].closeRange){
					if(getTubeCooldown(0) == 0){
						aimTurret(this.sensors.activeScanData[0].angle)
						fireTorpedo(0)
					}else if(getTubeCooldown(1) == 0){
						aimTurret(this.sensors.activeScanData[0].angle)
						fireTorpedo(1)
					}else if(getTubeCooldown(2) == 0){
						aimTurret(this.sensors.activeScanData[0].angle)
						fireTorpedo(2)
					}else if(getTubeCooldown(3) == 0){
						aimTurret(this.sensors.activeScanData[0].angle)
						fireTorpedo(3)
					}
				}
			}
		}
	}
}
