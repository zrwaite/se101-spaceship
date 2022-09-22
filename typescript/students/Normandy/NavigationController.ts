import { Vector2 } from '../helpers.js'
import { MapData, ShipStatus} from '../types.js'

import NavigationController from '../../src/subsystems/navigationController.js'
import YourDefenceController from './DefenseController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'
import WarpGate from '../../src/spaceObjects/warpGate.js'
//import { NumberLiteralType } from '../../../node_modules/typescript/lib/typescript.js'

export default class YourNavigationController extends NavigationController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	propulsion: YourPropulsionController

	//PUBLIC VARIABLES :)
	radius: number = 0;
	angularVelocity: number = 0;
	angle: number = 0;
	positionX: number = 0;
	positionY: number = 0;

	targetPositionX: number = 0; //PROPULSION: GET US TO THESE COORDINATES
	targetPositionY: number = 0;

	linearVelocityX: number = 0;
	linearVelocityY: number = 0;


	//did we warp to another solar system?
	warp: boolean = true;

	navigationUpdate(getShipStatus: (key: keyof ShipStatus) => number, warp: () => Error|null, land: () => Error|null, getMapData: () => MapData) {

		//update position function
		const UpdatePosition = () => {
			this.angle = getShipStatus('angle');
			this.positionX = getShipStatus('positionX');
			this.positionY = getShipStatus('positionY');
			this.angularVelocity = getShipStatus('angularVelocity');
			this.linearVelocityX = getShipStatus('linearVelocityX');
			this.linearVelocityY = getShipStatus('linearVelocityY');
		}

		UpdatePosition();

		/*uncomment this later

		//galaxy MAP
		let galaxyMap = new Map<string, SolarSystem[]>();

		//update position function
		const UpdatePosition = () => {
			this.angle = getShipStatus('angle');
			this.positionX = getShipStatus('positionX');
			this.positionY = getShipStatus('positionY');
			this.angularVelocity = getShipStatus('angularVelocity');
		this.linearVelocityX = getShipStatus('linearVelocityX');
			this.linearVelocityY = getShipStatus('linearVelocityY');
		}

		UpdatePosition();

		/* uncomment this later

		//galaxy MAP
		let galaxyMap = new Map<string, SolarSystem[]>();

		//did we warp to another solar system? (called once we enter the map)
		if (this.warp) {
			
			UpdatePosition();

			let mapData = getMapData();
			
			//does this galaxy exist in the galaxy map?
			if (galaxyMap.has(mapData.GalaxyData.name)) {

			}

			//else this galaxy DOES NOT exist in the map
			else {
				galaxyMap.set(mapData.GalaxyData.name, mapData.GalaxyData.solarSystems);
			}
			
			this.warp = false;

		}
		*/
		//galaxy
		interface GalaxyData {
			name: string
			solarSystems: SolarSystemData[]
		}

		//solarsystem
		interface SolarSystemData {
			name: string
			planets: Planet[]
			warpGates: WarpGate[]
		}

		//planet
		interface Planet {
			name: string
			x: number
			y: number
			planetComposition: {
				water: number
				air: number
				land: number
				metal: number
				safety: number
				temperature: number
			}
		}

		//warpgate
		interface WarpGate {
			name: string
			x: number
			y: number
		}
	}

}
