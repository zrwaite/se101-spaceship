import SolarSystem from "./solarSystem.js";
import Vector2 from "./helpers/Vector2.js";

//Parent class for galaxies, use data from galaxy jsons and GalaxyMaps scripts
//The constructor is going to build the galaxies
//Think of this as creating all the links between solar system levels
export default class Galaxy{
	constructor(galaxyName, game ){
		this.game = game;
		this.solarSystems = [];
		this.startingSolarSystem;
		switch(galaxyName){
			case "Alpha":
				// solarsystem1 = new SolarSystem("solarsystem 1");
				//Set solarSystems and starting solar system
				break;
			case "test":
				let testSS = new SolarSystem("test", this.game);
				this.solarSystems.push(testSS);
				this.startingSolarSystem = testSS.name;
				break;
			case "Beta": 
				break;
		}
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