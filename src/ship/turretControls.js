import Vector2 from "../helpers/Vector2.js";
import Torpedo from "./tordedo.js";

export default class TurretControls{
    constructor(parentShip){
		this.parentShip = parentShip;
	}
	aimTurret(aimTo){
		//User called function for aiming turret
	}
	getTubeCooldown(tubeIndex){
		//User called function for getting tube cooldown
	}
	fireTorpedo(){
		//User called function for firing torpedo
		// check for valid torpedo stuff, then create new one
		// torpedo = new Torpedo(new Vector2(40, 30), this.pos, this.game);
		// this.game.delObjects.push(torpedo);
	}
}