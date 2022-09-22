import { EMSReading } from '../ship/EMSReading.js'
import { PassiveReading } from '../ship/passiveReading.js'
import Sprite from '../sprite.js'
import DefenceController from './defenceController.js'
import NavigationController from './navigationController.js'
import PropulsionController from './propulsionController.js'

export default class SensorsController {
	// @ts-ignore
	navigation: NavigationController
	// @ts-ignore
	defence: DefenceController
	// @ts-ignore
	propulsion: PropulsionController
	// @ts-ignore
	target: PassiveReading | null = null;

	constructor() {
		// @ts-ignore
		this.navigation = null
		// @ts-ignore
		this.defence = null
		// @ts-ignore
		this.propulsion = null
		// @ts-ignore
		this.target = null
	}
	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {}
	initializeConnection = (
		defence: DefenceController,
		navigation: NavigationController,
		propulsion: PropulsionController
	) => {
		this.defence = defence
		this.propulsion = propulsion
		this.navigation = navigation
	}
}

