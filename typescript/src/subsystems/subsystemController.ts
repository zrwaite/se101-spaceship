import DefenceController from './defenceController.js'
import NavigationController from './navigationController.js'
import PropulsionController from './propulsionController.js'
import SensorsController from './sensorsController.js'

export default abstract class SubsystemController {
	defence?: DefenceController
	navigation?: NavigationController
	propulsion?: PropulsionController
	sensors?: SensorsController
	initialized = false
	initializeConnection = (
		defence: DefenceController | undefined,
		navigation: NavigationController | undefined,
		propulsion: PropulsionController | undefined,
		sensors: SensorsController | undefined
	) => {
		this.defence = defence
		this.navigation = navigation
		this.propulsion = propulsion
		this.sensors = sensors
		this.initialized = true
	}
}
