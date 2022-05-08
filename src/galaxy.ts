import SolarSystem from "./solarSystem.js";

//Parent class for galaxies, use data from galaxy jsons and GalaxyMaps scripts
//The constructor is going to build the galaxies
//Think of this as creating all the links between solar system levels
export default class Galaxy{
	/* constructor params */
	name;
	game;
	/* Default Attributes */
	solarSystems:SolarSystem[] = [];
	/* Other attributes */
	startingSolarSystem;
	solarSystemNames:string[] = [];
	constructor(galaxyName:string, game:any){
        this.name = galaxyName;
		this.game = game;
		switch(galaxyName){
			case "Alpha":
				this.solarSystemNames.push("Sol System", "Alpha Centauri System", "Kepler 438 System");
				break;
			case "test":
				this.solarSystemNames.push("test");
				break;
			case "Beta":
				this.solarSystemNames.push("Barnard's Star System", "Wolf 359 System", "Sirius System", "Luyten System");
				break;
			case "Gamma":
				this.solarSystemNames.push("Groombridge System", "Kruger System", "Aquarii System", 
									"Cygni System","Indi System", "Yennefer System", "Quaid System");
				break;
		}
		// Create solar systems with associated galaxy
		for (const name of this.solarSystemNames) {
			this.solarSystems.push(new SolarSystem(name, this.game));
		}
		
		// Set starting solar system to the first system in the list
		this.startingSolarSystem = this.solarSystemNames[0];
	}
	getSolarSystem(solarSystemName:string){
		let returnSolarSystem:SolarSystem|false = false;
		this.solarSystems.forEach((solarSystem)=>{
			if (solarSystem.name === solarSystemName) {
				returnSolarSystem = solarSystem;
			}
		})
		return returnSolarSystem;
	}

}