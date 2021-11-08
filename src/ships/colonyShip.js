import Sprite from "../sprite.js"
class ColonyShip extends Sprite{
	constructor(DefenceClass, NavigationClass, PropulsionClass, SensorsClass, ...args){
		super(...args)
		this.defenceController = new DefenceClass(this);
		this.navigationController = new NavigationClass(this);
		this.propulsionController = new PropulsionClass(this);
		this.sensorsController = new SensorsClass(this);
		this.image = document.getElementById("ship");
		this.height = 40;
		this.width = 40;
	}
	update(deltaTime) {
		//Add special update code here if needed
		this.manualControls();
		super.update()
	}
	igniteThrusters(thrusters){
		thrusters.forEach((thruster)=>{
			//do stuff for each thruster
		});
	}
	manualControls(){
		//react to the controller data
	}
}