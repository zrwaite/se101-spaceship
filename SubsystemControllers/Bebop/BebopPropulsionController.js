//Based on BebopPropulsionController.cs
import PropulsionController from "../../Sandbox/Scripts/AbstractSubsystemControllers/AbstractPropulsionController"
export default class BebopPropulsionController extends PropulsionController{
	constructor(...args){
    	super(...args);
  	}
	/* To get ship information, use the following functions:
	  getSensorsController()
	  getNavigationController()
	  getDefenceController()
	  see SandBox/Scripts/Ship/README.md for an explanation of return values.
	*/
	PropulsionUpdate(shipStatusInfo, thrusters, deltaTime){
		//Student code goes here
	}
}
