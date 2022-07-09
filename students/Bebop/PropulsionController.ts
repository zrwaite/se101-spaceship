import APIResponse from '../../src/helpers/response.js'
import Vector2 from '../../src/helpers/Vector2.js'
import { ShipStatus } from '../../src/ship/shipStatus.js'
import { ThrusterName } from '../../src/ship/thrusterController.js'
import PropulsionController from '../../src/subsystems/propulsionController.js'
export default class YourPropulsionController extends PropulsionController {
	/* To get other subsystem information, use the following functions:
	this.defence
	this.navigation
	this.sensors
	see SandBox/Scripts/Ship/README.md for an explanation of return values.
	*/
	timer = 0
	propulsionUpdate(shipStatusInfo: ShipStatus, setThrusters: (thrusterName: ThrusterName, power: number) => APIResponse) {
		//Student code goes here
	}
}
