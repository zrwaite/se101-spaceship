//Based on ExamplePropulsionController.cs
import SubsystemController from "../../src/subsystemController.js";
export default class ExamplePropulsionController extends SubsystemController{
	constructor(...args){
    	super(...args);
  	}
	/* To get ship information, use the following functions:
	  getSensorsController()
	  getNavigationController()
	  getDefenceController()
	  see SandBox/Scripts/Ship/README.md for an explanation of return values.
	*/
	PropulsionUpdate(shipStatusInfo, thrusters){
		//Student code goes here
	}
}
