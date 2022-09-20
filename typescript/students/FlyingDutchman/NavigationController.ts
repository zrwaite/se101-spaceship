import { Vector2 } from '../helpers.js'
import { MapData, ShipStatus} from '../types.js'

import NavigationController from '../../src/subsystems/navigationController.js'
import YourDefenceController from './DefenseController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController, { SpaceObject } from './SensorsController.js'

export default class YourNavigationController extends NavigationController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	propulsion: YourPropulsionController
	angle: number = 0
	

	//Add additional attributes here
	exploredSystems: string[] = []
	mapData: MapData|null = null

	possibleObjects: SpaceObject[] = []

	scanned: boolean = false
	target: Vector2 | null = null

	navigationUpdate(getShipStatus: (key: keyof ShipStatus) => number, warp: () => Error|null, land: () => Error|null, getMapData: () => MapData) {
		//Student code goes here
		if (!this.scanned) {
			this.mapData = getMapData()
			this.scanned = true;
			this.possibleObjects = this.sensors.warpgatesOrPlanets
		}
		


		this.angle = getShipStatus('angle')
		land()
	}

	//getter for mapData
	public get getMapData() {
		return this.mapData
	}

	//getter for target, returns vector 2 or null
	public get getTarget() {
		return this.target
	}


	// tries to update target
	updateTarget() {
		if (this.target == null) {
			//update if null
		}
		else if (true){
			//update if target was succesfully scanned, based on habitibility etc.
		}
		else {
			// dont update otherwise
		}
	}
}
