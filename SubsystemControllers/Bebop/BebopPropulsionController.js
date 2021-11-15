//Based on BebopPropulsionController.cs
import Vector2 from "../../src/helpers/Vector2.js";
import SubsystemController from "../../src/subsystemController.js";
export default class BebopPropulsionController extends SubsystemController{
	constructor(...args){
    	super(...args);
  	}
	propulsionUpdate(shipStatusInfo, thrusters, deltaTime){
		//Student code goes here
		let positionDifference = this.sensors.desiredPosition.subtract(this.pos);
	}
}
