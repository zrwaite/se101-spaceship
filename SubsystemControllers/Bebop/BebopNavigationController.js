//Based on BebopNavigationController.cs
import Vector2 from "../../src/helpers/Vector2.js";
import SubsystemController from "../../src/subsystemController.js";
export default class BebopNavigationController extends SubsystemController{
	constructor(...args){
    	super(...args);
  	}
	/* To get ship information, use the following functions:
	  this.defence
	  this.propulsion
	  this.sensors
	  see SandBox/Scripts/Ship/README.md for an explanation of return values.
	*/
	navigationController(shipStatusInfo, mapData, deltaTime){
		//Student code goes here
	}
}
