import Vector2 from "../helpers/Vector2.js";
import Sprite from "../sprite.js";
import PassiveSensors from "./passiveSensors.js";
import ActiveSensors from "./activeSensors.js";
import TurretControls from "./turretControls.js";
import ThrusterController from "./thrusterController.js";
/* Reference other colonyship.js file for reference to make this one
If you aren't sure about if a function should be copied or not, ask on discord. 
*/

export default class ColonyShip extends Sprite{
	constructor(name, DefenceClass, NavigationClass, PropulsionClass, SensorsClass, ...args){
		super(...args) //parent constructor
		this.name = name;
		this.defenceController = new DefenceClass(this); 
		this.navigationController = new NavigationClass(this);
		this.propulsionController = new PropulsionClass(this);
		this.sensorsController = new SensorsClass(this);

		this.defenceController.initializeConnection(null, this.navigationController, this.propulsionController, this.sensorsController) 
		this.navigationController.initializeConnection(this.defenceController, null, this.propulsionController, this.sensorsController) 
		this.propulsionController.initializeConnection(this.defenceController, this.navigationController, null, this.sensorsController) 
		this.sensorsController.initializeConnection(this.defenceController, this.navigationController, this.propulsionController, null) 

		this.turretControls = new TurretControls(this, this.pos, this.game);
		this.passiveSensors = new PassiveSensors(this);
		this.activeSensors = new ActiveSensors(this);
		this.thrusterController = new ThrusterController(this);

		this.totalDamage = 0;
		this.energyUsed = 0;
		this.primary = false;

		this.image = this.game.images["ship"];
		this.size = new Vector2(3, 2);
		this.radius = (this.size.x + this.size.y) / 4;		// we say the hurt box is avg of width and height 
		this.shipStatusInfo;
		this.solarSystem = this.game.solarSystem;
		this.ctx = "ships";
		this.mass = 3;
		this.maxASpeed = 0.3;
		this.maxSpeed = 0.5;
		
		// used in manual mode to force tap shooting and prevent
		// burst shots that cause torpedos fired to hit each other and explode immediately
		this.canTorpedo = true;

		// stores the linear acceleration from the frame of reference of the ship (e.g. forward-backward, left-right)
		// used to update accel by converting to global frame of reference
		// useful for thrusterControls to only need to recompute accels once per thruster power update
		// instead of every frame as the ship rotates
		this.localAccel = Vector2.zero;
		this.energyTimeCount = 0;
	}
	update() {
		this.energyTimeCount++;
		if (this.energyTimeCount>=10){
			this.energyUsed += 0.1;
			this.energyTimeCount=0;
		}
		//Add special update code here if needed
		if (this.primary) this.manualControls(); //use the data from keyboard control for testing
		
		this.defenceController.defenceUpdate(
			this.shipStatusInfo, 
			this.turretControls.aimTurret.bind(this.turretControls), 
			this.turretControls.getTubeCooldown.bind(this.turretControls), 
			this.turretControls.fireTorpedo.bind(this.turretControls));

		this.sensorsController.sensorsUpdate(
			this.shipStatusInfo, 
			this.activeSensors.performScan.bind(this.activeSensors), 
			this.passiveSensors.generatePassiveSensorReadings.bind(this.passiveSensors));
		this.navigationController.navigationController(
			this.shipStatusInfo, 
			this.tryWarp.bind(this),
			this.game.solarSystem.getMapData(this.pos));
		this.propulsionController.propulsionUpdate(
			this.shipStatusInfo, 
			this.thrusterController.setThruster.bind(this.thrusterController));
		this.boundaries();
		this.accel = this.accel.add(this.localAccel.rotate(this.angle.angle()));
		super.update() //parent update;
	}
	manualControls(){

		// 	Manual controls for propulsion
		// if (this.game.inputs.pressed.up) {
		// 	this.thrusterController.setThruster("mainThruster", 50);
		// } else {
		// 	this.thrusterController.setThruster("mainThruster", 0);
		// }
		// if (this.game.inputs.pressed.down) {
		// 	this.thrusterController.setThruster("portRetroThruster", 25);
		// 	this.thrusterController.setThruster("starboardRetroThruster", 25);
		// } else {
		// 	this.thrusterController.setThruster("portRetroThruster", 0);
		// 	this.thrusterController.setThruster("starboardRetroThruster", 0);
		// }
		// if (this.game.inputs.pressed.left) {
		// 	this.thrusterController.setThruster("starboardForeThruster", 25);
		// 	this.thrusterController.setThruster("portAftThruster", 25);
		// } else {
		// 	this.thrusterController.setThruster("starboardForeThruster", 0);
		// 	this.thrusterController.setThruster("portAftThruster", 0);
		// }
		// if (this.game.inputs.pressed.right) {
		// 	this.thrusterController.setThruster("portForeThruster", 25);
		// 	this.thrusterController.setThruster("starboardAftThruster", 25);
		// } else {
		// 	this.thrusterController.setThruster("portForeThruster", 0);
		// 	this.thrusterController.setThruster("starboardAftThruster", 0);
		// } 
		
		if (this.game.inputs.pressed.left) {
			this.aAccel.set(1, -0.005);
			this.energyUsed += 0.1;
		}
		else if (this.game.inputs.pressed.right ) {
			this.aAccel.set(1, 0.005)
			this.energyUsed += 0.1;
		}
 		else this.aAccel.set(1, 0);
 		if (this.game.inputs.pressed.up) {
			this.accel.set(0, 0);
			this.accel = this.accel.add(this.angle.scale(0.002));
			this.energyUsed += 0.1;
		}
 		else if (this.game.inputs.pressed.down){
			this.accel.set(0, 0);
			this.accel = this.accel.add(this.angle.scale(-0.002));
			this.energyUsed += 0.1;
		}
 		else this.accel.set(0,0);
		
		// Manual controls for firing torpedos (tap shooting)
		if (!this.game.inputs.pressed.space) {
			this.canTorpedo = true;
		} else if (this.game.inputs.pressed.space && this.canTorpedo) {
			try {
				this.turretControls.aimTurret(this.angle);
				const numberOfTubesResponse = this.turretControls.getNumberOfTubes();
				if (!numberOfTubesResponse.success) { 
					throw numberOfTubesResponse;
				}
				const numberOfTubes = numberOfTubesResponse.response["numberOfTubes"];
				const tubeIndex = this.game.frame % numberOfTubes;
				console.log("firing tubeIndex " + tubeIndex);
				const fireTorpedoResponse = this.turretControls.fireTorpedo(tubeIndex);
				if (!fireTorpedoResponse.success) {
					throw fireTorpedoResponse;
				}
				this.canTorpedo = false;
			} catch (e) {
				console.log(e);
			}
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
			this.accel.y = 0;
		} else if (this.pos.y<0) {
			this.pos.y = 0;
			this.speed.y = 0;
			this.accel.y = 0;
		}
		if (this.pos.x>this.game.width){ // x pos bounds
			this.pos.x = this.game.width;
			this.speed.x = 0;
			this.accel.x = 0;
		} else if (this.pos.x<0) {
			this.pos.x = 0;
			this.speed.x = 0;
			this.accel.x = 0;
		}
		//Max speeds
		if (this.speed.magnitude() > this.maxSpeed) {
			this.speed = this.speed.scaleTo(this.maxSpeed);
		}
		if (this.aSpeed.angle() > this.maxASpeed) {
			this.aSpeed = this.aSpeed.rotateTo(this.maxASpeed);
		}
		if (this.aSpeed.angle() < -this.maxASpeed) {
			this.aSpeed = this.aSpeed.rotateTo(-this.maxASpeed);
		}
	}
	// called when ship hits an asteroid
	receiveDamage(amount) {
		console.log("SHIP TOOK ", amount, "DMG")
		this.totalDamage += amount;
	}

	tryWarp(){
		this.energyUsed += 100;
		this.game.solarSystem.warpGates.forEach((warpGate) => {
			if (this.game.ifCollide(this, warpGate)) warpGate.warp();
		})
	}
}