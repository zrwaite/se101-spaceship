import Vector2 from "../../src/helpers/Vector2.js";
import SubsystemController from "../../src/subsystemController.js";
export default class SensorsController extends SubsystemController{
	constructor(...args){
    	super(...args);
  	}
	/* To get other subsystem information, use the following functions:
	this.defence
	this.navigation
	this.propulsion
	see SandBox/Scripts/Ship/README.md for an explanation of return values. (maybe, haven't added it yet)
	*/
	sensorsUpdate(shipStatusInfo, performActiveScan, performPassiveScan){
		//Student code goes here
    }
}
