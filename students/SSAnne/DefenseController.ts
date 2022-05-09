import APIResponse from "../../src/helpers/response.js";
import Vector2 from "../../src/helpers/Vector2.js";
import { ShipStatus } from "../../src/ship/shipStatus.js";
import DefenceController from "../../src/subsystems/defenceController.js";
export default class YourDefenceController extends DefenceController{
	/* To get other subsystem information, use the following functions:
	this.navigation
	this.propulsion
	this.sensors
	see SandBox/Scripts/Ship/README.md for an explanation of return values.
	*/
	defenceUpdate(
		shipStatusInfo:ShipStatus, 
		aimTurret:(angle:Vector2) => APIResponse, 
		getTubeCooldown:(tube:number) => APIResponse, 
		fireTorpedo:(tube:number) => APIResponse
	) {
		//Student code goes here
	}
}
