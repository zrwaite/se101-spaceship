import Vector2 from "./helpers/Vector2.js";
import Asteroid from "./spaceObjects/asteroid.js";
import WarpGate from "./spaceObjects/warpGate.js";
import Planet from "./spaceObjects/planet.js";
import AsteroidLauncher from "./spaceObjects/asteroidLauncher.js";

import AlphaCentauri from "../Sandbox/Scenes/SolarSystems/Alpha Centauri System.json" assert { type: "json" };
import Sol from "../Sandbox/Scenes/SolarSystems/Sol System.json" assert { type: "json" };
import Kepler438 from "../Sandbox/Scenes/SolarSystems/Kepler 438 System.json" assert { type: "json" };
import Aquarii from "../Sandbox/Scenes/SolarSystems/Aquarii System.json" assert { type: "json" };
import Barnards from "../Sandbox/Scenes/SolarSystems/Barnard's Star System.json" assert { type: "json" };
import Kruger from "../Sandbox/Scenes/SolarSystems/Kruger System.json" assert { type: "json" };
import Wolf359 from "../Sandbox/Scenes/SolarSystems/Wolf 359 System.json" assert { type: "json" };

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
		this.solarSystemData = {asteroids: [], warpgates: [], planets: []};
	
		switch(this.name){
			case "test":
				let asteroid1 = new Asteroid(new Vector2(0.2, 0.2), new Vector2(10, 10), this.game);
				asteroid1.aSpeed.set(1, 0.1);
				let asteroid2 = new Asteroid(new Vector2(-0.3, -0.3), new Vector2(40, 40), this.game);
				asteroid2.aSpeed.set(1, -0.2);
				let planet1 = new Planet("planet1", {}, 2, new Vector2(50, 10), this.game);
				let planet2 = new Planet("planet2", {}, 2, new Vector2(10, 50), this.game);
				
				this.asteroids.push(asteroid1, asteroid2);
				this.planets.push(planet1, planet2);
				break;
			case "Alpha Centauri System":
				this.solarSystemData = AlphaCentauri;
				break;
			case "Sol System":
				this.solarSystemData = Sol;
				break;
			case "Kepler 438 System":
				this.solarSystemData = Kepler438;
				break;
			case "Aquarii System": 
				this.solarSystemData = Aquarii;
				break;
			case "Barnard's Star System":
				this.solarSystemData = Barnards;
				break;
			case "Kruger System": 
				this.solarSystemData = Kruger;
				break;
			case "Wolf 359 System": 
				this.solarSystemData = Wolf359;
				break;
		}

		// Add asteroids to solar system
		for (const asteroid of this.solarSystemData.asteroids) {
			this.asteroids.push(new Asteroid(new Vector2(0,0), new Vector2(asteroid.position.x, asteroid.position.y), this.game));
		}

		// Add planets to solar system (containing name, scan signature, gravity signature, etc)
		for (const planet of this.solarSystemData.planets) {
			this.planets.push(new Planet(planet.name, planet.scanSignature, planet.gravitySignature, new Vector2(planet.position.x, planet.position.y), this.game));
		}
	}
	addWarpGate(){
		//Link togethers solarsystems with warpgates
	}
	getMapData(pos){
		//Get map data about a position for users to get data
	}
}