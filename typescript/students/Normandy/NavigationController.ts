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
	radius: number = 0; //how big the ship is
	angularVelocity: number = 0;
	angle: number = 0; //direction ship is facing
	positionX: number = 0;
	positionY: number = 0;
	linearVelocityX: number = 0;
	linearVelocityY: number = 0;
	thrusterPowerMain: number = 0;
	thrusterPowerBow: number = 0;
	thrusterPowerClockwise: number = 0;
	thrusterPowerCounterClockwise: number = 0;

	//runs multiple times a second
	navigationUpdate(getShipStatus: (key: keyof ShipStatus) => number, warp: () => Error|null, land: () => Error|null, getMapData: () => MapData) {

		//galaxy MAP
		//let map = new Map<Galaxy, SolarSystem[]>();


		//galaxy
		interface Galaxy {
			name: string
			solarSystems: SolarSystem[]
		}

		//solarsystem
		interface SolarSystem {
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
