import SolarSystem from "./player.js";

//Parent class for galaxies, use data from galaxy jsons and GalaxyMaps scripts
//The constructor is going to build the galaxies
//Think of this as creating all the links between solar system levels
export default class Galaxy{
	constructor(galaxyName){
		this.solarSystems = [];
		this.startingSolarSystem;
		switch(galaxyName){
			case "Alpha":
				// solarsystem1 = new SolarSystem("solarsystem 1");
				//Set solarSystems and starting solar system
				break;
			case "Beta": 
				break;
		}
	}
	getSolarSystem(solarSystemName){
		//get solarsystem from list by name
	}

}