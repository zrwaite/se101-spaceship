//Based on ExampleDefenceController.cs
import DefenceController from "../../Sandbox/Scripts/AbstractSubsystemControllers/AbstractDefenseController"
export default class ExampleDefenceController extends DefenceController{
	constructor(...args){
    	super(...args);
  	}
	/* To get ship information, use the following functions:
	  getSensorsController()
	  getNavigationController()
	  getPropulsionController()
	  see SandBox/Scripts/Ship/README.md for an explanation of return values.
	*/
  	DefenceUpdate(shipStatusInfo, turretControls, deltaTime){
		//Student code goes here
	}
}
