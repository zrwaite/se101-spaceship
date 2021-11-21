import Vector2 from "./helpers/Vector2.js";
import Asteroid from "./spaceObjects/asteroid.js";
import WarpGate from "./spaceObjects/warpGate.js";
import Planet from "./spaceObjects/planet.js";
import AsteroidLauncher from "./spaceObjects/asteroidLauncher.js";

// import AlphaCentauri from "../Sandbox/Scenes/SolarSystems/Alpha Centauri System.json" assert { type: "json" };
// import Sol from "../Sandbox/Scenes/SolarSystems/Sol System.json" assert { type: "json" };
// import Kepler438 from "../Sandbox/Scenes/SolarSystems/Kepler 438 System.json" assert { type: "json" };
// import Aquarii from "../Sandbox/Scenes/SolarSystems/Aquarii System.json" assert { type: "json" };
// import Barnards from "../Sandbox/Scenes/SolarSystems/Barnard's Star System.json" assert { type: "json" };
// import Kruger from "../Sandbox/Scenes/SolarSystems/Kruger System.json" assert { type: "json" };
// import Wolf359 from "../Sandbox/Scenes/SolarSystems/Wolf 359 System.json" assert { type: "json" };

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
		this.solarSystemData = {asteroids: [], asteroidLaunchers: [], warpgates: [], planets: []};

        /* INITIALIZATION FORMATTING:

        ----- Asteroid -----
        newAsteroid([speed.x, speed.y], aspeed, [pos.x, pos.y], this.game);
        -----  Planet  -----
        new Planet("imageName", [pos.x, pos.y], this.game);

        */
		switch(this.name){
			case "test":
				this.asteroids.push(...[
                    new Asteroid(new Vector2(0.07, 0.06), 0.06, new Vector2(25, 10), this.game),
                    new Asteroid(new Vector2(-0.1, -0.1), -0.1, new Vector2(40, 40), this.game),
                    new Asteroid(new Vector2(-0.04, 0), -0.05, new Vector2(70, 35), this.game),
                    new Asteroid(new Vector2(0.02, 0.005), 0.04, new Vector2(4, 27), this.game),
                    new Asteroid(new Vector2(0, 0), -0.05, new Vector2(16, 45), this.game),
                    new Asteroid(new Vector2(0, 0), 0.12, new Vector2(54, 20), this.game)
                ]);
				this.planets.push(...[
                    new Planet("planet1", 2, {}, new Vector2(50, 10), this.game),
                    new Planet("planet2", 2, {}, new Vector2(10, 50), this.game),
                    new Planet("planet3", 2, {}, new Vector2(60, 35), this.game),
                    new Planet("planet4", 2, {}, new Vector2(24, 19), this.game),
                    new Planet("planet5", 2, {}, new Vector2(33, 44), this.game),
                    new Planet("planet6", 2, {}, new Vector2(4, 9), this.game),
                    new Planet("planet7", 2, {}, new Vector2(11, 6), this.game),
                    new Planet("planet8", 2, {}, new Vector2(14, 23), this.game),
                    new Planet("planet9", 2, {}, new Vector2(19, 21), this.game),
                    new Planet("planet10", 2, {}, new Vector2(26, 46), this.game),
                    new Planet("planet11", 2, {}, new Vector2(37, 27), this.game),
                    new Planet("planet12", 2, {}, new Vector2(34, 40), this.game),
                    new Planet("planet13", 2, {}, new Vector2(68, 11), this.game),
                    new Planet("planet14", 2, {}, new Vector2(63, 48), this.game),
                ]);
				break;
			case "Alpha Centauri System":
				// this.solarSystemData = AlphaCentauri;
				break;
			case "Sol System":
				// this.solarSystemData = Sol;
				break;
			case "Kepler 438 System":
				// this.solarSystemData = Kepler438;
				break;
			case "Aquarii System": 
				// this.solarSystemData = Aquarii;
				break;
			case "Barnard's Star System":
				// this.solarSystemData = Barnards;
				break;
			case "Kruger System": 
				// this.solarSystemData = Kruger;
				break;
			case "Wolf 359 System": 
				// this.solarSystemData = Wolf359;
				break;
		}

		// Add asteroids to solar system
		for (const asteroid of this.solarSystemData.asteroids) {
			this.asteroids.push(new Asteroid(new Vector2(0,0), 0, new Vector2(asteroid.position.x, asteroid.position.y), this.game));
		}

		// Add planets to solar system (containing name, scan signature, gravity signature, etc)
		for (const planet of this.solarSystemData.planets) {
			this.planets.push(new Planet(planet.name, planet.scanSignature, planet.gravitySignature, new Vector2(planet.position.x, planet.position.y), this.game));
		}

		// Add asteroid launchers (containing position)
		for (const asteroidLaunchers of this.solarSystemData.asteroidLaunchers) {
			this.asteroidLaunchers.push(new AsteroidLauncher(asteroidLaunchers.position, this.game));
		}

		// Add warpgates (containing destination solar system name, position)
		for (const warpgate of this.solarSystemData.warpgates) {
			this.warpGates.push(new WarpGate(warpgate.to, warpgate.position, this.game));
		}
	}
	addWarpGate(){
		//Link togethers solarsystems with warpgates
	}
	getMapData(pos){
		//Get map data about a position for users to get data
	}
}