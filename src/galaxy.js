import SolarSystem from "./solarSystem.js";
import Vector2 from "./helpers/Vector2.js";

//Parent class for galaxies, use data from galaxy jsons and GalaxyMaps scripts
//The constructor is going to build the galaxies
//Think of this as creating all the links between solar system levels
export default class Galaxy{
	constructor(galaxyName, game){
        this.name = galaxyName;
		this.game = game;
		this.solarSystems = [];
		this.startingSolarSystem;

		let solarSystemNames = [];
		switch(galaxyName){
			case "Alpha":
				solarSystemNames.push("Sol System", "Alpha Centauri System", "Kepler 438 System");
				break;
			case "test":
				solarSystemNames.push("test");
				break;
			case "Beta":
				solarSystemNames.push("Barnard's Star System", "Wolf 359 System", "Sirius System", "Luyten System");
				break;
			case "Gamma":
				solarSystemNames.push("Groombridge System", "Kruger System", "Aquarii System", 
									"Cygni System","Indi System", "Yennefer System", "Quaid System");
				break;
		}

		// Create solar systems with associated galaxy
		for (const name of solarSystemNames) {
			this.solarSystems.push(new SolarSystem(name, this.game));
		}
		
		// Set starting solar system to the first system in the list
		this.startingSolarSystem = this.solarSystems[0].name;
	}
	getSolarSystem(solarSystemName){
		let returnSolarSystem = false;
		this.solarSystems.forEach((solarSystem)=>{
			if (solarSystem.name == solarSystemName) {
				returnSolarSystem =  solarSystem;
			};
		})
		return returnSolarSystem;
	}

}