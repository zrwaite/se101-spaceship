import DefenceController from "./defenceController.js";
import NavigationController from "./navigationController.js";
import PropulsionController from "./propulsionController.js";
import SensorsController from "./sensorsController.js";

export default abstract class SubsystemController{
	defence:DefenceController|null = null;
	navigation:NavigationController|null = null;
	propulsion:PropulsionController|null = null;
	sensors:SensorsController|null = null;
	initialized = false;
	initializeConnection = (defence:DefenceController|null, navigation:NavigationController|null, propulsion:PropulsionController|null, sensors:SensorsController|null) =>{
		this.defence = defence;
		this.navigation = navigation;
		this.propulsion = propulsion;
		this.sensors = sensors;
		this.initialized = true;
	}
}
