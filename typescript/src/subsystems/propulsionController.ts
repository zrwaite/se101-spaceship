import { ThrusterName } from '../ship/thrusterController.js'
import DefenceController from './defenceController.js'
import NavigationController from './navigationController.js'
import SensorsController from './sensorsController.js'

export default class PropulsionController {
	// @ts-ignore
	navigation: NavigationController
	// @ts-ignore
	defence: DefenceController
	// @ts-ignore
	sensors: SensorsController
	propulsionUpdate(setThruster: (thruster: ThrusterName, power: number) => Error | null) {}
	constructor() {
		// @ts-ignore
		this.navigation = null
		// @ts-ignore
		this.defence = null
		// @ts-ignore
		this.sensors = null
	}
	initializeConnection = (
		defence: DefenceController,
		navigation: NavigationController,
		sensors: SensorsController
	) => {
		this.defence = defence
		this.navigation = navigation
		this.sensors = sensors
	}
}
