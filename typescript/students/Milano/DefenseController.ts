import DefenceController from '../../src/subsystems/defenceController.js'
import { Vector2, withinPiRange, angleDiff } from '../helpers.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'
import { EMSReading } from '../types.js'
import { PassiveReading } from '../types.js'
export default class YourDefenceController extends DefenceController {
	// To get other subsystem information, use the attributes below. 
	// @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	propulsion: YourPropulsionController
	//Add additional attributes here

	readonly G: number = 1.0 / 3;
	readonly SHIP_MASS: number = 3;
	readonly ASTEROID_MASS: number = 5;

	// dummy function
	// will eventually calculate ideal heading using math
	targetHeading(object: EMSReading | PassiveReading, shipVelocity: Vector2) {
		if (object instanceof EMSReading) {
			return object.angle
		} else {
			return object.heading
		}
	}

	defenceUpdate(aimTurret: (angle: number) => void, getTubeCooldown: (i: number) => number | Error, fireTorpedo: (i: number) => Error | null) {
		if(!this.sensors.target) return;
		if(this.shouldShoot(this.sensors.target)){
			aimTurret(this.targetHeading(this.sensors.target, new Vector2(0,0)));
			fireTorpedo(0);
		}
	}

	//determine whether or not ship should shoot
	shouldShoot(target: PassiveReading | null){
		if(target === null || target.gravity < 0){
			return false;
		}

		let estimatedRadius: number = Math.sqrt(this.G * this.SHIP_MASS * this.ASTEROID_MASS / target.gravity);
		
		return estimatedRadius < 5;
	}
}
