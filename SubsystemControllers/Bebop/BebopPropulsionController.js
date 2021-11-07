//Based on BebopPropulsionController.cs
import Vector2 from "../../Sandbox/Scripts/Helpers/Vector2";
import PropulsionController from "../../Sandbox/Scripts/AbstractSubsystemControllers/AbstractPropulsionController"
export default class BebopPropulsionController extends PropulsionController{
	constructor(...args){
    	super(...args);
  	}
	PropulsionUpdate(shipStatusInfo, thrusters, deltaTime){
		//Student code goes here
		let positionDifference = this.sensors.desiredPosition.subtract(this.pos);
	}
}
