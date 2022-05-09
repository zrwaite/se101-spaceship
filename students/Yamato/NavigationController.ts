import APIResponse from "../../src/helpers/response.js";
import Vector2 from "../../src/helpers/Vector2.js";
import { ShipStatus } from "../../src/ship/shipStatus.js";
import NavigationController from "../../src/subsystems/navigationController.js";
export default class YourNavigationController extends NavigationController{
	/* To get other subsystem information, use the following functions:
	this.defence
	this.propulsion
	this.sensors
	see SandBox/Scripts/Ship/README.md for an explanation of return values.
	*/
	navigationUpdate(shipStatusInfo:ShipStatus, warp:()=>APIResponse, mapData: APIResponse) {
		//Student code goes here
	}
}
