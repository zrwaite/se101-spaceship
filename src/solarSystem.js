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
                    new Planet("planet1", new Vector2(50, 10), this.game),
                    new Planet("planet2", new Vector2(10, 50), this.game),
                    new Planet("planet3", new Vector2(60, 35), this.game),
                    new Planet("planet4", new Vector2(24, 19), this.game),
                    new Planet("planet5", new Vector2(33, 44), this.game),
                    new Planet("planet6", new Vector2(4, 9), this.game),
                    new Planet("planet7", new Vector2(11, 6), this.game),
                    new Planet("planet8", new Vector2(14, 23), this.game),
                    new Planet("planet9", new Vector2(19, 21), this.game),
                    new Planet("planet10", new Vector2(26, 46), this.game),
                    new Planet("planet11", new Vector2(37, 27), this.game),
                    new Planet("planet12", new Vector2(34, 40), this.game),
                    new Planet("planet13", new Vector2(68, 11), this.game),
                    new Planet("planet14", new Vector2(63, 48), this.game),
                ]);
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