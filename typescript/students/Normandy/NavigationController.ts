import { Vector2, withinPiRange} from '../helpers.js'
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
	angle = 0;
	shipVelocity = new Vector2(0, 0);
	shipPosition = new Vector2(0, 0);
	targetAngle = 0
	shipPlanetDistance = 0
	shipWarpDistance = 0

	navigationUpdate(getShipStatus: (key: keyof ShipStatus) => number, warp: () => Error|null, land: () => Error|null, getMapData: () => MapData) {
		//Student code goes here
		this.angle = getShipStatus('angle')		//ship's current angle

		this.shipVelocity = new Vector2(getShipStatus('linearVelocityX'), getShipStatus('linearVelocityY'))
		this.shipPosition = new Vector2(getShipStatus('positionX'), getShipStatus('positionY'))
		var landDest = this.sensors.landTarget		//absolute coordinates 
		var warpDest = this.sensors.warpTarget



		var visited: boolean[][] = []
		

		if (landDest != null) {
			this.targetAngle = withinPiRange((landDest.subtract(this.shipPosition)).angle())	//target angle
			//console.log("angle" + this.angle)
		}
		else if (warpDest != null) {
			this.targetAngle = withinPiRange((warpDest.subtract(this.shipPosition)).angle())

		}
		

		
       if(landDest) {
            this.shipPlanetDistance = (landDest.subtract(this.shipPosition)).magnitude();
			//Math.sqrt((this.shipPosition.x-landDest.x)^2+(this.shipPosition.y-landDest.y)^2);
            if (this.shipPlanetDistance<=5){
                land();
            }
        }

		if(warpDest) {
            this.shipWarpDistance = (warpDest.subtract(this.shipPosition)).magnitude();
			//Math.sqrt((this.shipPosition.x-landDest.x)^2+(this.shipPosition.y-landDest.y)^2);
			if (this.shipWarpDistance<=5){
                warp();
            }
        }

		// if (getShipStatus('positionX')) {
			
		// }

		//land();
	}
}
