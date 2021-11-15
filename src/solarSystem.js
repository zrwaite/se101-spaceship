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
				let asteroid1 = new Asteroid(new Vector2(0.2, 0.2), new Vector2(10, 10), this.game);
				asteroid1.aSpeed.set(1, 0.1);
				let asteroid2 = new Asteroid(new Vector2(-0.3, -0.3), new Vector2(40, 40), this.game);
				asteroid2.aSpeed.set(1, -0.2);
				let planet1 = new Planet("planet1", new Vector2(50, 10), this.game);
				let planet2 = new Planet("planet2", new Vector2(10, 50), this.game);
				
				this.asteroids.push(asteroid1, asteroid2);
				this.planets.push(planet1, planet2);
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