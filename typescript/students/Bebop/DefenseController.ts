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

	torpedoTargets: number[] = [];

	defenceUpdate(aimTurret: (angle: number) => void, getTubeCooldown: (i: number) => number | Error, fireTorpedo: (i: number) => Error | null) {
		if (!this.sensors.target) return
		if (this.sensors.activeScanData != null && this.sensors.activeScanData[0] != null) {
			for (let i = 0; i < this.sensors.activeScanData.length; i++) {
				this.torpedoTargets.push(this.sensors.activeScanData[i].angle);
			}
		}

		for (let i = 0; i < 4; i++) {
			const target = this.torpedoTargets[0];
			if (getTubeCooldown(i) == 0) {
				aimTurret(target);
				fireTorpedo(i);
				this.torpedoTargets.shift();
			}
		}

		this.torpedoTargets = [];

	}
}
