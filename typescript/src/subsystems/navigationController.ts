import { MapData } from '../ship/mapData.js'
import { ShipStatus } from '../ship/shipStatus.js'
import DefenceController from './defenceController.js'
import PropulsionController from './propulsionController.js'
import SensorsController from './sensorsController.js'
export default class NavigationController {
	// @ts-ignore
	defence: DefenceController
	// @ts-ignore
	propulsion: PropulsionController
	// @ts-ignore
	sensors: SensorsController
	angle: number
	navigationUpdate(getShipStatus: (key: keyof ShipStatus) => number, warp: () => Error|null, land: () => Error|null, getMapData: () => MapData) {}
	constructor() {
		// @ts-ignore
		this.defence = null
		// @ts-ignore
		this.propulsion = null
		// @ts-ignore
		this.sensors = null
		// @ts-ignore
		this.angle = 0
	}
	initializeConnection = (
		defence: DefenceController,
		propulsion: PropulsionController,
		sensors: SensorsController
	) => {
		this.defence = defence
		this.propulsion = propulsion
		this.sensors = sensors
	}
}
