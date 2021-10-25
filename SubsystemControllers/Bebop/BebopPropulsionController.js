//Based on BebopPropulsionController.cs
import Vector2 from "../../Sandbox/Scripts/Helpers/Vector2";
import PropulsionController from "../../Sandbox/Scripts/AbstractSubsystemControllers/AbstractPropulsionController"
export default class BebopPropulsionController extends PropulsionController{
	constructor(...args){
    	super(...args);
  	}
	/* To get ship information, use the following functions:
	  this.defence
	  this.navigation
	  this.sensors
	  see SandBox/Scripts/Ship/README.md for an explanation of return values.
	*/
	PropulsionUpdate(shipStatusInfo, thrusters, deltaTime){
		//Student code goes here
	}
}
