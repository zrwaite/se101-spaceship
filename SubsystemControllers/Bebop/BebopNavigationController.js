//Based on BebopNavigationController.cs
import NavigationController from "../../Sandbox/Scripts/AbstractSubsystemControllers/AbstractNavigationController"
export default class BebopNavigationController extends NavigationController{
	constructor(...args){
    	super(...args);
  	}
	/* To get ship information, use the following functions:
	  this.getDefence()
	  this.getSensors()
	  this.getPropulsion()
	  see SandBox/Scripts/Ship/README.md for an explanation of return values.
	*/
	NavigationController(shipStatusInfo, galaxyMapData, deltaTime){
		//Student code goes here
	}
}
