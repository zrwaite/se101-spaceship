import Vector2 from "./helpers/Vector2.js";
import Asteroid from "./spaceObjects/asteroid.js";
import WarpGate from "./spaceObjects/warpGate.js";
import Planet from "./spaceObjects/planet.js";
import AsteroidLauncher from "./spaceObjects/asteroidLauncher.js";

//Parent class for solarsystems, use data from solarsystem jsons and galaxy and spaceobjects scripts
//The constructor is going to build the levels
//Think of this as sort of a level builder
export default class SolarSystem{
	constructor(solarSystemName, game){
		this.game = game;
		this.name = solarSystemName;
		this.asteroids = [];
		this.warpGates = [];
		this.planets = [];
		this.asteroidLaunchers = [];
		switch(this.name){
			case "test":
				let asteroid = new Asteroid(new Vector2(0, 0), new Vector2(10, 10), this.game);
				this.asteroids.push(asteroid);
				break;
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