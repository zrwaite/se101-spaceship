import Vector2 from "../helpers/Vector2.js";
import Sprite from "../sprite.js";
import PassiveSensors from "./passiveSensors.js";
import ActiveSensors from "./activeSensors.js";
import TurretControls from "./tordedo.js";
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
		this.image = this.game.images["ship"];
		this.height = 40;
		this.width = 40;
		this.shipStatusInfo;
		this.solarSystem;
	}
	update() {
		//Add special update code here if needed
		this.defenceController.defenceUpdate(this.shipStatusInfo, this.turretControls, deltaTime);
		this.sensorsController.sensorsUpdate(this.shipStatusInfo, this.activeSensors, this.passiveSensors, deltaTime)
		this.navigationController.navigationController(this.shipStatusInfo, this.solarSystem.getMapData(this.pos), deltaTime)
		this.propulsionController.propulsionUpdate(this.shipStatusInfo, this.thrusterController, deltaTime)
		this.manualControls(); //use the data from keyboard control for testing
		super.update() //parent update;
	}
	manualControls(){
		//react to the controller data
		//Calls this.thrusterController
	}
	updateShipStatusInfo(){
		//see past function
	}	
}