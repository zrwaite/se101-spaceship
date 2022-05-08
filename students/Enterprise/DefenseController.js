import Vector2 from "../../src/helpers/Vector2.js";
import SubsystemController from "../../src/subsystems/subsystemController.js";
export default class DefenceController extends SubsystemController{
	constructor(...args){
    	super(...args);
  	}
	/* To get other subsystem information, use the following functions:
	this.navigation
	this.propulsion
	this.sensors
	see SandBox/Scripts/Ship/README.md for an explanation of return values.
	*/
  	defenceUpdate(shipStatusInfo, aimTurret, getTubeData, fireTorpedo){
		//Student code goes here
	}
}
