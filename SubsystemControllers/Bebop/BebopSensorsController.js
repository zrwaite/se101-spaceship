//Based on BebopSensorsController.cs
import Vector2 from "../../Sandbox/Scripts/Helpers/Vector2";
import SubsystemController from "../../src/subsystemController.js";
export default class BebopSensorsController extends SubsystemController{
	constructor(...args){
    	super(...args);
		this.desiredPosition = new Vector2(5,5);
  	}
	
	/* To get ship information, use the following functions:
	  this.defence
	  this.navigation
	  this.propulsion
	  see SandBox/Scripts/Ship/README.md for an explanation of return values. (maybe, haven't added it yet)
	*/
	SensorsUpdate(shipStatusInfo, activeSensors, passiveSensors, deltaTime){
		//Student code goes here
	}
}
