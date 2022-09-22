import DefenceController from '../../src/subsystems/defenceController.js'
import { Vector2, withinPiRange, angleDiff } from '../helpers.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'
import { EMSReading, MapData, ShipStatus} from '../types.js'
import NavigationController from '../../src/subsystems/navigationController.js'


export default class YourDefenceController extends DefenceController {
	// To get other subsystem information, use the attributes below. 
	// @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	propulsion: YourPropulsionController
	//Add additional attributes here
	
	defenceUpdate(aimTurret: (angle: number) => void, getTubeCooldown: (i: number) => number | Error, fireTorpedo: (i: number) => Error | null) {
		const closeRangeObject = this.sensors.closeRangeObject;
		//Student code goes here
		if(!this.sensors.targets) 
			return;

		//auto shoot when cooldown is done
		

		closeRangeObject && closeRangeObject.forEach(object => {
			if(object?.closeRange) {
				if (object.closeRange.type === "Asteroid" ||object.closeRange.type === "Meteor") {
					if (getTubeCooldown(0) == 0) {
                        if (object.angle != null) {
                            aimTurret(object.angle);
                            fireTorpedo(0);
                        }
                    }
				if (object.closeRange.type === "Asteroid" ||object.closeRange.type === "Meteor"){
					if (getTubeCooldown(1) == 0) {
						if (object.angle != null) {
								aimTurret(object.angle);
								fireTorpedo(1);
							}
						}
					}
                if (object.closeRange.type === "Asteroid" ||object.closeRange.type === "Meteor"){
					if (getTubeCooldown(2) == 0) {
						if (object.angle != null) {
								aimTurret(object.angle);
								fireTorpedo(2);
							}
						}
					}
				if (object.closeRange.type === "Asteroid" ||object.closeRange.type === "Meteor"){
					if (getTubeCooldown(3) == 0) {
						if (object.angle != null) {
								aimTurret(object.angle);
								fireTorpedo(3);
							}
						}
					}
				}
				
			}
		})
		
		// function for firing torpedo
		function fireTorpedoFunc(object: EMSReading, val: number) {
			console.log(val)
			if (getTubeCooldown(val) == 0) {
				if (object.angle != null) {
					aimTurret(object.angle);
					fireTorpedo(val);
				}
			}
		}
	}

}

