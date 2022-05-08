import Vector2 from "../../src/helpers/Vector2.js";
import { ShipStatus } from "../../src/ship/shipStatus.js";
import SensorsController from "../../src/subsystems/sensorsController.js";
export default class YourSensorsController extends SensorsController{
	/* To get other subsystem information, use the following functions:
	this.defence
	this.navigation
	this.propulsion
	see SandBox/Scripts/Ship/README.md for an explanation of return values. (maybe, haven't added it yet)
	*/
	sensorsUpdate(shipStatusInfo:ShipStatus, performActiveScan:()=>any, performPassiveScan:()=>any) {
		//Student code goes here
    }
}
