import Vector2 from "../helpers/Vector2.js";
import Sprite from "../sprite.js";
import PassiveSensors from "./passiveSensors.js";
import ActiveSensors from "./activeSensors.js";
import TurretControls from "./../../Sandbox/Scripts/Ship/TurretControls.js";
import Turret from "./../../Sandbox/Scripts/Ship/Turret.js"
import ThrusterController from "./thrusterController.js";
/* Reference other colonyship.js file for reference to make this one
If you aren't sure about if a function should be copied or not, ask on discord. 
*/

export default class ColonyShip extends Sprite{
	constructor(DefenceClass, NavigationClass, PropulsionClass, SensorsClass, ...args){
		super(...args) //parent constructor
		this.defenceController = new DefenceClass(this); 
		this.navigationController = new NavigationClass(this);
		this.propulsionController = new PropulsionClass(this);
		this.sensorsController = new SensorsClass(this);
		this.turretControls = new TurretControls(this);
		this.passiveSensors = new PassiveSensors(this);
		this.activeSensors = new ActiveSensors(this);
		this.thrusterController = new ThrusterController(this);

		this.totalDamage = 0;

		this.turret = new Turret(this, this.turretControls);
		this.image = this.game.images["ship"];
		this.size = new Vector2(3, 2);
		this.radius = (this.size.x + this.size.y) / 4;		// we say the hurt box is avg of width and height 
		this.shipStatusInfo;
		this.solarSystem;
		this.ctx = "ships";
		this.mass = 3;
	}
	update() {
		//Add special update code here if needed
		this.defenceController.defenceUpdate(this.shipStatusInfo, this.turretControls);
		this.sensorsController.sensorsUpdate(this.shipStatusInfo, this.activeSensors, this.passiveSensors)
		this.navigationController.navigationController(this.shipStatusInfo, this.game.solarSystem.getMapData(this.pos))
		this.propulsionController.propulsionUpdate(this.shipStatusInfo, this.thrusterController)
		this.manualControls(); //use the data from keyboard control for testing
		this.boundaries();
		super.update() //parent update;
	}
	manualControls(){
		//	Manual controls for velocity 
		/*if (this.game.inputs.pressed.left) this.aSpeed.set(1, -0.05);
		else if (this.game.inputs.pressed.right) this.aSpeed.set(1, 0.05)
		else this.aSpeed.set(1, 0);
		if (this.game.inputs.pressed.up) this.speed = this.angle.scale(0.2)
		// else if (this.game.inputs.pressed.down) this.speed = this.angle.scale(-0.2);
		else this.speed.set(0,0);

		// can fire missle every 30 frames
		if (this.game.inputs.pressed.down && this.game.frame%30 == 0) {
			this.turret.fireMissile(1)
		}*/

		// 	Manual controls for accel
		if (this.game.inputs.pressed.left) this.aAccel.set(1, -0.005);
		else if (this.game.inputs.pressed.right) this.aAccel.set(1, 0.005)
		else this.aAccel.set(1, 0);
		if (this.game.inputs.pressed.up) this.accel = this.accel.add(this.angle.scale(0.001))
		// else if (this.game.inputs.pressed.down) this.accel = this.accel.add(this.angle.scale(-0.001));
		else this.accel.set(0,0);

		if (this.game.inputs.pressed.down && this.game.frame%30 == 0) {
			this.turret.fireMissile(1)
		}

		//react to the controller data
		//Calls this.thrusterController
	}
	updateShipStatusInfo(){
		//see past function
	}
	boundaries(){
		if (this.pos.y>this.game.height){ //y pos bounds
			this.pos.y = this.game.height;
			this.speed.y = 0;
		} else if (this.pos.y<0) {
			this.pos.y = 0;
			this.speed.y = 0;
		}
		if (this.pos.x>this.game.width){ // x pos bounds
			this.pos.x = this.game.width;
			this.speed.x = 0;
		} else if (this.pos.x<0) {
			this.pos.x = 0;
			this.speed.x = 0;
		}
	}
	// called when ship hits an asteroid
	receiveDamage(amount) {
		console.log("SHIP TOOK ", amount, "DMG")
		this.totalDamage += amount;
	}
}