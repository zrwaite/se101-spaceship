import { Vector2 } from '../helpers.js'
import { MapData, ShipStatus} from '../types.js'

import NavigationController from '../../src/subsystems/navigationController.js'
import YourDefenceController from './DefenseController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'

export default class YourNavigationController extends NavigationController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	propulsion: YourPropulsionController

	//Add additional attributes here
	startLanding = false;
	startWarping = false;
	landWarpDelayCounter = 0;

	radius = 0;
	angularVelocity = 0;
	angle = 0;
	positionX = 0;
	positionY = 0;
	linearVelocityX = 0;
	linearVelocityY = 0;
	thrusterPowerMain = 0;
	thrusterPowerBow = 0;
	thrusterPowerClockwise = 0;
	thrusterPowerCounterClockwise = 0;

	navigationUpdate(getShipStatus: (key: keyof ShipStatus) => number, warp: () => Error|null, land: () => Error|null, getMapData: () => MapData) {
		// Update attributes (currently don't know which ones are needed by other subsystems)
		
		// this.radius = getShipStatus('radius');
		this.angularVelocity = getShipStatus('angularVelocity');
		this.angle = getShipStatus('angle');
		// this.positionX = getShipStatus('positionX');
		// this.positionY = getShipStatus('positionY');
		this.linearVelocityX = getShipStatus('linearVelocityX');
		this.linearVelocityY = getShipStatus('linearVelocityY');
		// this.thrusterPowerMain = getShipStatus('thrusterPowerMain');
		// this.thrusterPowerBow = getShipStatus('thrusterPowerBow');
		// this.thrusterPowerClockwise = getShipStatus('thrusterPowerClockwise');
		// this.thrusterPowerCounterClockwise = getShipStatus('thrusterPowerCounterClockwise');


		/*plan: repeatedly call land or warp once per half second if a planet or warphole is detected and
		within a certain distance of the spaceship. 
		 */
		this.landWarpDelayCounter++; 
		if (this.startLanding && this.landWarpDelayCounter % 30 === 0) {
            land();
            console.log("land");
        }

        if (this.startWarping && this.landWarpDelayCounter % 30 === 0) {
            warp();
            console.log("warp");
        }

        if (this.sensors.activeScanData) {
            for (let i = 0; i < this.sensors.activeScanData.length; i++) {
                const obj = this.sensors.activeScanData[i];
                if (obj.closeRange && obj.distance <= 100) {
                    if (obj.closeRange.type === 'Planet') {
                        this.startLanding = true; 
                    } else if (obj.closeRange.type === 'WarpGate') {
                        this.startWarping = true; 
                    }
				}
			}
		}
	}
}
