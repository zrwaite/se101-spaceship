//Based on BebopPropulsionController.cs
import Vector2 from "../../src/helpers/Vector2.js";
import SubsystemController from "../../src/subsystemController.js";
export default class BebopPropulsionController extends SubsystemController{
	constructor(...args){
    	super(...args);
  	}
	propulsionUpdate(shipStatusInfo, setThrusters){
		console.log(setThrusters("starboardAftThruster", 999));
		//Student code goes here
	}
}
