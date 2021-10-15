//Based on BebopDefenceController.cs
import Vector2 from "../../Sandbox/Scripts/Helpers/Vector2";
import DefenceController from "../../Sandbox/Scripts/AbstractSubsystemControllers/AbstractDefenseController"
export default class BebopDefenceController extends DefenceController{
	constructor(...args){
    	super(...args);
  	}
	/* To get ship information, use the following functions:
	  this.navigation
	  this.propulsion
	  this.sensors
	  see SandBox/Scripts/Ship/README.md for an explanation of return values.
	*/
  	DefenceUpdate(shipStatusInfo, turretControls, deltaTime){
		//Student code goes here
	}
}
