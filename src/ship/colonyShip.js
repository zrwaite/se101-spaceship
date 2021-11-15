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
		this.size = new Vector2(40, 40);
		this.shipStatusInfo;
		this.solarSystem;
		this.ctx = "ships";
	}
	update() {
		//Add special update code here if needed
		this.defenceController.defenceUpdate(this.shipStatusInfo, this.turretControls);
		this.sensorsController.sensorsUpdate(this.shipStatusInfo, this.activeSensors, this.passiveSensors)
		this.navigationController.navigationController(this.shipStatusInfo, this.game.solarSystem.getMapData(this.pos))
		this.propulsionController.propulsionUpdate(this.shipStatusInfo, this.thrusterController)
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