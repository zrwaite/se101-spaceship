//Based on BebopSensorsController.cs
import SensorsController from "../../Sandbox/Scripts/AbstractSubsystemControllers/AbstractSensorsController"
export default class BebopSensorsController extends SensorsController{
	constructor(...args){
    	super(...args);
  	}
	/* To get ship information, use the following functions:
	  this.getDefence()
	  this.getNavigation()
	  this.getPropulsion()
	  see SandBox/Scripts/Ship/README.md for an explanation of return values. (maybe, haven't added it yet)
	*/
	SensorsUpdate(shipStatusInfo, activeSensors, passiveSensors, deltaTime){
		//Student code goes here
	}
}
