import Vector2 from "../../src/helpers/Vector2.js";
import SubsystemController from "../../src/subsystems/subsystemController.js";
export default class NavigationController extends SubsystemController{
	constructor(...args){
    	super(...args);
  	}
	/* To get other subsystem information, use the following functions:
	this.defence
	this.propulsion
	this.sensors
	see SandBox/Scripts/Ship/README.md for an explanation of return values.
	*/
	navigationController(shipStatusInfo, warp, mapData){
		//Student code goes here
	}
}
