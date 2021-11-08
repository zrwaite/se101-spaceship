import Vector2 from "../Helpers/Vector2";

export default class ThrusterController{
    constructor(parentShip){
		this.parentShip = parentShip;
	}
	//You can implement this differently:
	igniteThrusters(thrusters){
		thrusters.forEach((thruster)=>{
			//do stuff for each thruster
		});
	}
}