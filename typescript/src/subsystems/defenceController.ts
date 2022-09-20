import { PassiveReading } from '../ship/passiveReading.js'
import NavigationController from './navigationController.js'
import PropulsionController from './propulsionController.js'
import SensorsController from './sensorsController.js'

export default class DefenceController {

	
	// @ts-ignore
	navigation: NavigationController
	// @ts-ignore
	propulsion: PropulsionController
	// @ts-ignore
	sensors: SensorsController

	defenceUpdate(aimTurret: (angle: number) => void, getTubeCooldown: (i: number) => number | Error, fireTorpedo: (i: number) => Error | null) {
		if (!this.sensors.target) return 
		aimTurret (this.sensors.target.heading)
		fireTorpedo(0)
	}
	constructor() {
		// @ts-ignore
		this.navigation = null
		// @ts-ignore
		this.propulsion = null
		// @ts-ignore
		this.sensors = null
		
	}
	initializeConnection = (
		navigation: NavigationController,
		propulsion: PropulsionController,
		sensors: SensorsController
	) => {
		this.navigation = navigation
		this.propulsion = propulsion
		this.sensors = sensors
	}

}
