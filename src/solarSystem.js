//import Vector2 from "./helpser"
import Asteroid from "./spaceObjects/asteroid.js";
import WarpGate from "./spaceObjects/warpGate.js";
import Planet from "./spaceObjects/planet.js";
import AsteroidLauncher from "./spaceObjects/asteroidLauncher.js";

//Parent class for solarsystems, use data from solarsystem jsons and galaxy and spaceobjects scripts
//The constructor is going to build the levels
//Think of this as sort of a level builder
export default class SolarSystem{
	constructor(warpGates){
		this.asteroids = [];
		this.warpGates = [];
		this.planets = [];
		this.asteroidLaunchers = [];
		this.startingSolarSystem;
		warpGates.forEach((warpGate)=>{this.addWarpGate(warpGate);})
		switch(galaxyName){
			case "Alpha Centauri":
				// asteroid1 = new Asteroid(new Vector2(1,2));
				// planet1 = new Planet(new Vector2(30,40));
				// asteroidLauncher1 = new AsteroidLauncher(new Vector2(100,200));
				// create asteroids, planets and launchers. Not warp gates
				break;
			case "Aquarii": 
				break;
		}
	}
	addWarpGate(){
		//Link togethers solarsystems with warpgates
	}
	getMapData(pos){
		//Get map data about a position for users to get data
	}
}