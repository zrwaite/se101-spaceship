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
		this.solarSystemData = {asteroids: [], asteroidLaunchers: [], warpgates: [], planets: []};

        /* INITIALIZATION FORMATTING:

        -----     Asteroid     -----
        new Asteroid([speed.x, speed.y], aspeed, [pos.x, pos.y], this.game);
		----- AsteroidLauncher -----
		new AsteroidLauncher([pos.x, pos.y], this.game);
        -----      Planet      -----
        new Planet("imageName", [pos.x, pos.y], this.game);
		-----     Warp Gate    -----
		new WarpGate("destination", [pos.x, pos.y], this.game);

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
				this.asteroids.push(...[
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-261, 343), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-393, -272), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(458, -272), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(607, 233), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(153, 166), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(117, -222), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-548, 194), this.game)
				]);
				this.warpGates.push(...[
					new WarpGate("Sol System", new Vector2(-643, -269), this.game),
					new WarpGate("Bernard's Star System", new Vector2(-313, 468), this.game),
					new WarpGate("Kruger System", new Vector2(676, 525), this.game),
					new WarpGate("Wolf 359 System", new Vector2(730, -268), this.game),
					new WarpGate("Kepler 438 System", new Vector2(313, 386), this.game)
				]);
				break;
			case "Aquarii System": 
				this.asteroids.push(...[
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-369, -227), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-351, -123), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-390, -15), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-472, 76), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-585, 130), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(646, -67), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(531, -32), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(441, -43), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(378, 153), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(352, 283), this.game)
				]);
				this.warpGates.push(...[
					new WarpGate("Groombridge System", new Vector2(-639, -91), this.game),
					new WarpGate("Wolf 359 System", new Vector2(576, 199), this.game)
				]);
				break;
			case "Barnard's Star System":
				this.asteroids.push(...[
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-321, -172), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-309, -256), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(644, -109), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(574, 228), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-39, 415), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-103, 277), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(324, 192), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(412, -38), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-155, -284), this.game)
				]);
				this.warpGates.push(...[
					new WarpGate("Alpha Centauri System", new Vector2(-418, -320), this.game),
					new WarpGate("Sol System", new Vector2(-66, 547), this.game),
					new WarpGate("Sirius System", new Vector2(763, -142), this.game),
					new WarpGate("Wolf 359 System", new Vector2(693, 256), this.game),
					new WarpGate("Indi System", new Vector2(-440, 246), this.game)
				]);
				break;
			case "Cygni System":
				this.asteroids.push(...[
					new Asteroid(new Vector2(0, 0), 0, new Vector2(576, 235), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(484, 109), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(387, -21), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(248, -151), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(118, -231), this.game)
				]);
				this.asteroidLaunchers.push(...[
					new AsteroidLauncher(new Vector2(997, 1152), this.game),
					new AsteroidLauncher(new Vector2(-198, -1068), this.game)
				]);
				this.warpGates.push(...[
					new WarpGate("Alpha Centauri System", new Vector2(-266, 377), this.game),
					new WarpGate("Sol System", new Vector2(870, -246), this.game)
				]);
				break;
			case "Groombridge System":
				this.warpGates.push(...[
					new WarpGate("Quaid System", new Vector2(485, -397), this.game),
					new WarpGate("Kepler 438 System", new Vector2(892, 381), this.game),
					new WarpGate("Wolf 359 System", new Vector2(-431, -217), this.game),
					new WarpGate("Aquarii System", new Vector2(-306, 302), this.game)
				]);
				break;
			case "Indi System":
				this.asteroids.push(...[
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-207, 86), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-91, 196), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(220, 276), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(490, 91), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(389, -240), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(190, -257), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(753, -140), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(702, 194), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(123, 417), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-186, 512), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-218, -233), this.game)
				]);
				this.warpGates.push(...[
					new WarpGate("Quaid System", new Vector2(668, -292), this.game),
					new WarpGate("Luyten System", new Vector2(-382, 358), this.game),
					new WarpGate("Barnard's Star System", new Vector2(648, 391), this.game)
				]);
				break;
			case "Kepler 438 System":
				// Generate asteroids at modulo offsets (to prevent hardcoding large # of asteroids)
				//! TODO: UPDATE
				for (let i = 0; i < 30; i++) {
					this.asteroids.push(new Asteroid(new Vector2(0, 0), 0, new Vector2(-308, 66), this.game));
				}
				this.planets.push(...[
					new Planet("Planet Kepler 438", {"Common":70, "Metal":20, "Water":10},
						2, new Vector2(1276, 108), this.game),
					new Planet("Planet Avallac", {"Common":70, "Metal":20, "Terror":10, "Water":0},
						2, new Vector2(-1219, -211), this.game)
				]);
				this.warpGates.push(...[
					new WarpGate("Quaid System", new Vector2(-424, 410), this.game),
					new WarpGate("Sirius System", new Vector2(719, -141), this.game),
					new WarpGate("Alpha Centauri System", new Vector2(-621, -45), this.game),
					new WarpGate("Wolf 359 System", new Vector2(-8, -342), this.game),
					new WarpGate("Groombridge System", new Vector2(245, 558), this.game)
				]);
				break;
			case "Kruger System": 
				this.asteroids.push(...[
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-503, -107), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-392, -195), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-320, -380), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-501, -429), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-656, -364), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(636, -204), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(47, -200), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-200, 188), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-293, 265), this.game)
				]);
				this.warpGates.push(new WarpGate("Alpha Centauri System", new Vector2(-505, -286), this.game));
				break;
			case "Luyten System":
				this.asteroids.push(...[
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-308, 66), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-138, 300), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-341, 497), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(275, 76), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(185, -185), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-94, -175), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-121, -434), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(247, 209), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(543, -191), this.game)
				]);
				this.asteroidLaunchers.push(new AsteroidLauncher(new Vector2(-532, -499), this.game));
				this.warpGates.push(...[
					new WarpGate("Cygni System", new Vector2(3, -329), this.game),
					new WarpGate("Sirius System", new Vector2(-396, 303), this.game),
					new WarpGate("Indi System", new Vector2(401, 329), this.game)
				]);
				break;
			case "Quaid System":
				// Generate asteroids at modulo offsets (to prevent hardcoding large # of asteroids)
				//! TODO: UPDATE
				for (let i = 0; i < 30; i++) {
					this.asteroids.push(new Asteroid(new Vector2(0, 0), 0, new Vector2(-308, 66), this.game));
				}
				this.asteroidLaunchers.push(...[
					new AsteroidLauncher(new Vector2(-704, -725), this.game),
					new AsteroidLauncher(new Vector2(-243, 529), this.game)
				]);
				this.warpGates.push(...[
					new WarpGate("Yennefer System", new Vector2(640, -147), this.game),
					new WarpGate("Indi System", new Vector2(285, 440), this.game),
					new WarpGate("Kepler 438 System", new Vector2(905, -33), this.game),
					new WarpGate("Cygni System", new Vector2(-316, 115), this.game),
					new WarpGate("Groombridge System", new Vector2(7, -244), this.game)
				]);
				break;
			case "Sirius System":
				this.asteroids.push(...[
					new Asteroid(new Vector2(0, 0), 0, new Vector2(222, -117), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(142, 177), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(434, 339), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(701, 216), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(655, -189), this.game)
				]);
				this.warpGates.push(...[
					new WarpGate("Luyten System", new Vector2(-297, 155), this.game),
					new WarpGate("Barnard's Star System", new Vector2(179, -152), this.game),
					new WarpGate("Kepler 438 System", new Vector2(513, -453), this.game),
					new WarpGate("Sol System", new Vector2(-506, -33), this.game)
				]);
				break;
			case "Sol System":
				this.asteroids.push(...[
					new Asteroid(new Vector2(0, 0), 0, new Vector2(600, 0), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(1011, -469), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(729, 429), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(830, -493), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(539, -484), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(800, -200), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(800, 200), this.game)
				]);
				this.warpGates.push(...[
					new WarpGate("Alpha Centauri System", new Vector2(800, 0), this.game),
					new WarpGate("Barnard's Star System", new Vector2(746, 599), this.game),
					new WarpGate("Sirius System", new Vector2(1107, -369), this.game)
				]);
				break;
			case "Wolf 359 System": 
				this.asteroids.push(...[
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-479, -7), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-334, 318), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(320, 361), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(454, -70), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(0, -298), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(223, 84), this.game),
					new Asteroid(new Vector2(0, 0), 0, new Vector2(-45, 202), this.game)
				]);
				this.warpGates.push(...[
					new WarpGate("Aquarii System", new Vector2(-498, -345), this.game),
					new WarpGate("Groombridge System", new Vector2(800, -266), this.game),
					new WarpGate("Kepler 438 System", new Vector2(-718, 359), this.game),
					new WarpGate("Alpha Centauri System", new Vector2(145, 573), this.game),
					new WarpGate("Barnard's Star System", new Vector2(759, 218), this.game)
				]);
				break;
			case "Yennefer System":
				this.warpGates.push(new WarpGate("Quaid System", new Vector2(575, -116), this.game));
				break;
		}

		// // Add asteroids to solar system
		// for (const asteroid of this.solarSystemData.asteroids) {
		// 	this.asteroids.push(new Asteroid(new Vector2(0,0), 0, new Vector2(asteroid.position.x, asteroid.position.y), this.game));
		// }

		// // Add planets to solar system (containing name, scan signature, gravity signature, etc)
		// for (const planet of this.solarSystemData.planets) {
		// 	this.planets.push(new Planet(planet.name, planet.scanSignature, planet.gravitySignature, new Vector2(planet.position.x, planet.position.y), this.game));
		// }

		// // Add asteroid launchers (containing position)
		// for (const asteroidLaunchers of this.solarSystemData.asteroidLaunchers) {
		// 	this.asteroidLaunchers.push(new AsteroidLauncher(asteroidLaunchers.position, this.game));
		// }

		// // Add warpgates (containing destination solar system name, position)
		// for (const warpgate of this.solarSystemData.warpgates) {
		// 	this.warpGates.push(new WarpGate(warpgate.to, warpgate.position, this.game));
		// }
	}
	addWarpGate(){
		//Link togethers solarsystems with warpgates
	}
	getMapData(pos){
		//Get map data about a position for users to get data
	}
}