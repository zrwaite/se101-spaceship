import Sprite from "../sprite.js";
import Torpedo from "./tordedo.js";
/* Reference other colonyship.js file for reference to make this one
If you aren't sure about if a function should be copied or not, ask on discord. 
*/

class ColonyShip extends Sprite{
	constructor(DefenceClass, NavigationClass, PropulsionClass, SensorsClass, ...args){
		super(...args) //parent constructor
		this.defenceController = new DefenceClass(this); 
		this.navigationController = new NavigationClass(this);
		this.propulsionController = new PropulsionClass(this);
		this.sensorsController = new SensorsClass(this);
		this.image = document.getElementById("ship"); //Get image for rendering
		this.height = 40;
		this.width = 40;
	}
	update(deltaTime) {
		//Add special update code here if needed
		this.manualControls(); //use the data from keyboard control for testing
		super.update() //parent update;
	}
	igniteThrusters(thrusters){
		thrusters.forEach((thruster)=>{
			//do stuff for each thruster
		});
	}
	fireTorpedo(){
		// check for valid torpedo stuff, then create new one
		// torpedo = new Torpedo(new Vector2(40, 30), this.pos, this.game);
		// this.game.delObjects.push(torpedo);
	}	
	manualControls(){
		//react to the controller data
	}
	UpdateShipStatusInfo(){
		//see past function
	}
}