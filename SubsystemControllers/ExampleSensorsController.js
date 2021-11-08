//Based on ExampleSensorsController.cs
import SubsystemController from "../../src/subsystemController.js";
export default class ExampleSensorsController extends SubsystemController{
	constructor(...args){
    	super(...args);
  	}
	/* To get ship information, use the following functions:
	  getDefenceController()
	  getNavigationController()
	  getPropulsionController()
	  see SandBox/Scripts/Ship/README.md for an explanation of return values. (maybe, haven't added it yet)
	*/
	SensorsUpdate(shipStatusInfo, activeSensors, passiveSensors, deltaTime){
		//Student code goes here
	}
}
