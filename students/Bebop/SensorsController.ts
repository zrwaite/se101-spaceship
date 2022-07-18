import { withinPiRange, Vector2 } from '../helpers.js'
import SensorsController from '../../src/subsystems/sensorsController.js'
import { ShipStatus, activeScanType, passiveScanType } from '../types.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
export default class YourSensorsController extends SensorsController {
	// To get other subsystem information, use the attributes below.
	defence?: YourDefenceController
	navigation?: YourNavigationController
	propulsion?: YourPropulsionController
	asteroidAhead = false
	asteroidDirection: number = 0
	timer = 0
	idealHeading: number = 0
	sensorsUpdate(shipStatusInfo: ShipStatus, activeScan: activeScanType, passiveScan: passiveScanType) {
		//Student code goes here
		this.timer++
		if (this.timer % 50 == 0) {
			this.asteroidAhead = false
			let startAngle = withinPiRange(shipStatusInfo.angle - Math.PI / 4)
			let arc = Math.PI / 2
			let res = activeScan(startAngle, arc, 300)
			if (res.response.length > 0) {
				this.asteroidAhead = true
				this.asteroidDirection = res.response[0].Angle
				console.log(this.asteroidDirection)
				console.log(shipStatusInfo.angle)
			}
		}
		if (this.timer % 10 == 0) {
			this.idealHeading = passiveScan().response[0].Heading
		}
	}
}
