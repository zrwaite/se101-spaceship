import { withinPiRange } from '../../src/helpers/Angles.js'
import APIResponse from '../../src/helpers/response.js'
import Vector2 from '../../src/helpers/Vector2.js'
import { ShipStatus } from '../../src/ship/shipStatus.js'
import SensorsController from '../../src/subsystems/sensorsController.js'
export default class YourSensorsController extends SensorsController {
	/* To get other subsystem information, use the following functions:
	this.defence
	this.navigation
	this.propulsion
	see SandBox/Scripts/Ship/README.md for an explanation of return values. (maybe, haven't added it yet)
	*/
	timer = 0
	sensorsUpdate(shipStatusInfo: ShipStatus, activeScan: (heading: number, arc: number, range: number) => APIResponse, passiveScan: () => APIResponse) {
		//Student code goes here
		this.timer++
		if (this.timer % 100 == 0) {
			let startAngle = withinPiRange(shipStatusInfo.angle - Math.PI / 4)
			let arc = Math.PI / 2
			// let startAngle = Math.PI / 2
			// let arc = Math.PI
			let res = activeScan(startAngle, arc, 200)
			res.response.forEach((obj: any) => {})
		}
	}
}
