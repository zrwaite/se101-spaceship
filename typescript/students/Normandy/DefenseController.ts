import DefenceController from '../../src/subsystems/defenceController.js'
import { Vector2, withinPiRange, angleDiff } from '../helpers.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'

const NUMBER_OF_TUBES = 4;

export default class YourDefenceController extends DefenceController {
	// To get other subsystem information, use the attributes below. 
	// @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	propulsion: YourPropulsionController

	//Add additional attributes here
	torpedoNum: number = 0;

	nextTorpedo() {
		return this.torpedoNum = (this.torpedoNum + 1) % NUMBER_OF_TUBES;
	}

	defenceUpdate(aimTurret: (angle: number) => void, getTubeCooldown: (i: number) => number | Error, fireTorpedo: (i: number) => Error | null) {
		//Student code goes here
		if (!this.sensors.target) return;
		aimTurret(this.sensors.target.heading);
        fireTorpedo(this.nextTorpedo());
	}
}
