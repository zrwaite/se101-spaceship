//Import all subsystems
import BebopDefenceController from "../../../SubsystemControllers/Bebop/BebopDefenseController.js";
import BebopNavigationController from "../../../SubsystemControllers/Bebop/BebopNavigationController.js";
import BebopPropulsionController from "../../../SubsystemControllers/Bebop/BebopPropulsionController.js";
import BebopSensorsController from "../../../SubsystemControllers/Bebop/BebopSensorsController.js";
import ColonyShip from "../colonyShip.js";
//Instance of colonyship for bebop group
const buildBebop = (pos, game) =>{
	//build bebop with its subsystems and info
	bebop = new ColonyShip(
		BebopDefenceController, 
		BebopNavigationController, 
		BebopPropulsionController, 
		BebopSensorsController,
		pos, game
	);
	return bebop;
}	
//export to buildShip.js
export default buildBebop;

//Duplicate this file for all ships