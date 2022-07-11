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
	sensorsUpdate(shipStatusInfo: ShipStatus, activeScan: activeScanType, passiveScan: passiveScanType) {
		//Student code goes here
		this.timer++
		if (this.timer % 100 == 0) {
			this.asteroidAhead = false
			let startAngle = withinPiRange(shipStatusInfo.angle - Math.PI / 4)
			let arc = Math.PI / 2
			let res = activeScan(startAngle, arc, 300)
			res.response.forEach((obj) => {
				console.log(obj.Velocity)
				if (obj.Velocity.x !== 0 || obj.Velocity.y !== 0) {
					console.log('asteroid ahead')
					this.asteroidAhead = true
					this.asteroidDirection = obj.Angle
				}
			})
		}
	}
}
