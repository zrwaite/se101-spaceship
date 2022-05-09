import Vector2 from "./helpers/Vector2.js";
import Asteroid from "./spaceObjects/asteroid.js";
import WarpGate from "./spaceObjects/warpGate.js";
import Planet from "./spaceObjects/planet.js";
import AsteroidLauncher from "./spaceObjects/asteroidLauncher.js";
import Composition from "./spaceObjects/planetComposition.js";
import APIResponse from "./helpers/response.js";
//The constructor is going to build the levels
//Think of this as a sort of level builder
export default class SolarSystem {
    constructor(solarSystemName, galaxyName, game) {
        this.game = game;
        this.galaxyName = galaxyName;
        this.name = solarSystemName;
        this.asteroids = [];
        this.warpGates = [];
        this.planets = [];
        this.asteroidLaunchers = [];
        /* INITIALIZATION FORMATTING:

        -----     Asteroid     -----
        new Asteroid([speed.x, speed.y], aspeed, [pos.x, pos.y], this.game);
        ----- AsteroidLauncher -----
        new AsteroidLauncher([pos.x, pos.y], spawnPeriod = 4, spawnCount = -1, rotation = -1);
        -----      Planet      -----
        new Planet("imageName", new Composition(), [pos.x, pos.y], this.game);
        -----     Warp Gate    -----
        new WarpGate("destination", [pos.x, pos.y], this.game);

        */
        switch (this.name) {
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
                    new Planet("planet1", new Composition(0, 0, 0, 0, 0, 0), new Vector2(50, 10), this.game),
                    new Planet("planet2", new Composition(0, 0, 0, 0, 0, 0), new Vector2(10, 50), this.game),
                    new Planet("planet3", new Composition(0, 0, 0, 0, 0, 0), new Vector2(60, 35), this.game),
                    new Planet("planet4", new Composition(0, 0, 0, 0, 0, 0), new Vector2(24, 19), this.game),
                    new Planet("planet5", new Composition(0, 0, 0, 0, 0, 0), new Vector2(33, 44), this.game),
                    new Planet("planet6", new Composition(0, 0, 0, 0, 0, 0), new Vector2(4, 9), this.game),
                    new Planet("planet7", new Composition(0, 0, 0, 0, 0, 0), new Vector2(11, 6), this.game),
                    new Planet("planet8", new Composition(0, 0, 0, 0, 0, 0), new Vector2(14, 23), this.game),
                    new Planet("planet9", new Composition(0, 0, 0, 0, 0, 0), new Vector2(19, 21), this.game),
                    new Planet("planet10", new Composition(0, 0, 0, 0, 0, 0), new Vector2(26, 46), this.game),
                    new Planet("planet11", new Composition(0, 0, 0, 0, 0, 0), new Vector2(37, 27), this.game),
                    new Planet("planet12", new Composition(0, 0, 0, 0, 0, 0), new Vector2(34, 40), this.game),
                    new Planet("planet13", new Composition(0, 0, 0, 0, 0, 0), new Vector2(68, 11), this.game),
                    new Planet("planet14", new Composition(0, 0, 0, 0, 0, 0), new Vector2(63, 48), this.game),
                ]);
                this.asteroidLaunchers.push(new AsteroidLauncher(this.game, new Vector2(50, 50), 4, 10, Math.PI * 3 / 4));
                break;
            case "Alpha Centauri System":
                this.asteroids.push(...[
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(20, 42), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(13, 17), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(43, 11), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(68, 38), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(46, 31), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(4, 28), this.game)
                ]);
                this.warpGates.push(...[
                    new WarpGate("Kepler 438 System", new Vector2(32, 39), this.game)
                ]);
                break;
            case "Aquarii System":
                this.asteroids.push(...[
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(23, 9), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(21, 13), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(16, 44), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(11, 28), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(3, 32), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(49, 23), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(70, 4), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(63, 24), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(52, 36), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(54, 49), this.game)
                ]);
                this.warpGates.push(...[
                    new WarpGate("Groombridge System", new Vector2(3, 16), this.game),
                    new WarpGate("Kruger System", new Vector2(30, 21), this.game),
                    new WarpGate("Cygni System", new Vector2(60, 21), this.game)
                ]);
                break;
            case "Barnard's Star System":
                this.asteroids.push(...[
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(4, 10), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(6, 4), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(70, 16), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(61, 37), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(37, 45), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(23, 34), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(48, 26), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(51, 19), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(17, 14), this.game)
                ]);
                this.warpGates.push(...[
                    new WarpGate("Wolf 359 System", new Vector2(36, 52), this.game),
                    new WarpGate("Sirius System", new Vector2(71, 11), this.game),
                ]);
                break;
            case "Cygni System":
                this.asteroids.push(...[
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(67, 40), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(61, 31), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(31, 4), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(25, 18), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(11, 7), this.game)
                ]);
                this.asteroidLaunchers.push(...[
                    new AsteroidLauncher(this.game, new Vector2(61, 51), 5, 10),
                    new AsteroidLauncher(this.game, new Vector2(21, 2), 4, 12, Math.PI / 4)
                ]);
                this.warpGates.push(...[
                    new WarpGate("Kruger System", new Vector2(41, 31), this.game),
                    new WarpGate("Aquarii System", new Vector2(51, 11), this.game),
                    new WarpGate("Indi System", new Vector2(31, 41), this.game),
                    new WarpGate("Yennefer System", new Vector2(14, 42), this.game)
                ]);
                break;
            case "Groombridge System":
                this.warpGates.push(...[
                    new WarpGate("Kruger System", new Vector2(51, 11), this.game),
                    new WarpGate("Aquarii System", new Vector2(14, 42), this.game)
                ]);
                break;
            case "Indi System":
                this.asteroids.push(...[
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(10, 28), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(29, 35), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(41, 34), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(51, 27), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(48, 15), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(37, 14), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(70, 19), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(68, 26), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(38, 43), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(30, 50), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(6, 5), this.game)
                ]);
                this.warpGates.push(...[
                    new WarpGate("Kruger System", new Vector2(16, 48), this.game),
                    new WarpGate("Cygni System", new Vector2(48, 16), this.game),
                    new WarpGate("Yennefer System", new Vector2(5, 16), this.game),
                    new WarpGate("Quaid System", new Vector2(48, 35), this.game)
                ]);
                break;
            case "Kepler 438 System":
                // Generate asteroids at modulo offsets (to prevent hard coding large # of asteroids)
                for (let i = 0; i < 10; i++) {
                    this.asteroids.push(new Asteroid(new Vector2(0, 0), 0, new Vector2((31 + 25 * i) % 71, (17 + 29 * i) % 53), this.game));
                }
                this.planets.push(...[
                    new Planet("planet6", new Composition(0, 0, 0, 0, 0, 0), new Vector2(69, 41), this.game),
                    new Planet("planet4", new Composition(0, 0, 0, 0, 0, 0), new Vector2(8, 13), this.game)
                ]);
                this.warpGates.push(...[
                    new WarpGate("Sol System", new Vector2(14, 37), this.game),
                ]);
                break;
            case "Kruger System":
                this.asteroids.push(...[
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(9, 26), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(21, 24), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(25, 13), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(6, 5), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(2, 11), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(68, 21), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(36, 20), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(31, 23), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(29, 49), this.game)
                ]);
                this.warpGates.push(new WarpGate("Groombridge System", new Vector2(37, 9), this.game), new WarpGate("Aquarii System", new Vector2(11, 40), this.game), new WarpGate("Cygni System", new Vector2(61, 39), this.game));
                break;
            case "Luyten System":
                this.asteroids.push(...[
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(18, 25), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(34, 38), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(14, 49), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(41, 27), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(36, 22), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(32, 23), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(30, 4), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(45, 31), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(65, 20), this.game)
                ]);
                this.asteroidLaunchers.push(new AsteroidLauncher(this.game, new Vector2(0, 0), 4, 20, Math.PI / 6));
                this.warpGates.push(...[
                    new WarpGate("Barnard's Star System", new Vector2(37, 9), this.game),
                    new WarpGate("Sirius System", new Vector2(11, 40), this.game),
                    new WarpGate("Wolf 359 System", new Vector2(61, 39), this.game)
                ]);
                this.planets.push(...[
                    new Planet("planet2", new Composition(0, 0, 0, 0, 0, 0), new Vector2(45, 65), this.game),
                    new Planet("planet1", new Composition(0, 0, 0, 0, 0, 0), new Vector2(8, 8), this.game)
                ]);
                break;
            case "Quaid System":
                // Generate asteroids at modulo offsets (to prevent hard coding large # of asteroids)
                for (let i = 0; i < 5; i++) {
                    this.asteroids.push(new Asteroid(new Vector2(0, 0), 0, new Vector2((51 + 41 * i) % 71, (41 + 41 * i) % 53), this.game));
                }
                this.asteroidLaunchers.push(...[
                    new AsteroidLauncher(this.game, new Vector2(8, 5), 4, 15),
                    new AsteroidLauncher(this.game, new Vector2(26, 41), 7, 10)
                ]);
                this.warpGates.push(...[
                    new WarpGate("Yennefer System", new Vector2(59, 19), this.game),
                    new WarpGate("Indi System", new Vector2(41, 41), this.game),
                    new WarpGate("Cygni System", new Vector2(11, 28), this.game),
                    new WarpGate("Groombridge System", new Vector2(30, 16), this.game)
                ]);
                break;
            case "Sirius System":
                this.asteroids.push(...[
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(41, 24), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(35, 12), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(47, 42), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(70, 34), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(64, 23), this.game)
                ]);
                this.warpGates.push(...[
                    new WarpGate("Luyten System", new Vector2(21, 43), this.game),
                    new WarpGate("Barnard's Star System", new Vector2(37, 25), this.game),
                    new WarpGate("Wolf 359 System", new Vector2(3, 29), this.game)
                ]);
                break;
            case "Sol System":
                this.asteroids.push(...[
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(21, 20), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(70, 4), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(37, 48), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(51, 5), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(11, 7), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(46, 13), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(46, 31), this.game)
                ]);
                this.warpGates.push(...[
                    new WarpGate("Alpha Centauri System", new Vector2(43, 23), this.game),
                ]);
                break;
            case "Wolf 359 System":
                this.asteroids.push(...[
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(15, -7), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(24, 42), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(43, 45), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(51, 24), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(34, 15), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(39, 22), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(28, 27), this.game)
                ]);
                this.warpGates.push(...[
                    new WarpGate("Luyten System", new Vector2(18, 8), this.game),
                    new WarpGate("Sirius System", new Vector2(67, 10), this.game),
                    new WarpGate("Barnard's Star System", new Vector2(64, 30), this.game)
                ]);
                break;
            case "Yennefer System":
                this.warpGates.push(new WarpGate("Aquarii System", new Vector2(16, 48), this.game), new WarpGate("Cygni System", new Vector2(48, 16), this.game), new WarpGate("Indi System", new Vector2(5, 16), this.game), new WarpGate("Quaid System", new Vector2(48, 35), this.game));
                break;
        }
    }
    getMapData(pos) {
        //Get map data about a position for users to get data
        const mapData = {
            galaxy: this.galaxyName,
            solarSystem: this.name
        };
        return new APIResponse(200, [], mapData, true);
    }
}
