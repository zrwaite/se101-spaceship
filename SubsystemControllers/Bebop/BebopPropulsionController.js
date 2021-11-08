//Based on BebopPropulsionController.cs
import Vector2 from "../../Sandbox/Scripts/Helpers/Vector2";
import SubsystemController from "../../src/subsystemController.js";
export default class BebopPropulsionController extends SubsystemController{
	constructor(...args){
    	super(...args);
  	}
	PropulsionUpdate(shipStatusInfo, thrusters, deltaTime){
		//Student code goes here
		let positionDifference = this.sensors.desiredPosition.subtract(this.pos);
	}
}
