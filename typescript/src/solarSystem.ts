import Vector2 from './helpers/Vector2.js'
import Asteroid from './spaceObjects/asteroid.js'
import WarpGate from './spaceObjects/warpGate.js'
import Planet from './spaceObjects/planet.js'
import AsteroidLauncher from './spaceObjects/asteroidLauncher.js'
import Composition from './spaceObjects/planetComposition.js'
import APIResponse from './helpers/response.js'
import Game from './game.js'

interface MapData {
	galaxy: string
	solarSystem: string
}

//The constructor is going to build the levels
//Think of this as a sort of level builder
export default class SolarSystem {
	shipStartPosition = new Vector2(300, 300)
	warpGates: WarpGate[]
	planets: Planet[]
	asteroids: Asteroid[]
	game: Game
	name: string
	galaxyName: string
	asteroidLaunchers: AsteroidLauncher[]
	constructor(solarSystemName: string, galaxyName: string, game: Game) {
		this.game = game
		this.galaxyName = galaxyName
		this.name = solarSystemName
		this.asteroids = []
		this.warpGates = []
		this.planets = []
		this.asteroidLaunchers = []

		/* INITIALIZATION FORMATTING:

        -----     Asteroid     -----
        new Asteroid([speed.x, speed.y], aspeed, [pos.x, pos.y], this.game);
		----- AsteroidLauncher -----
		new AsteroidLauncher([pos.x, pos.y], spawnPeriod = 4, spawnCount = -1, rotation = -1);
        -----      Planet      -----
        new Planet("imageName", 20, new Composition(), [pos.x, pos.y], this.game);
		-----     Warp Gate    -----
		new WarpGate("destination", [pos.x, pos.y], this.game);

        */
		switch (this.name) {
			case 'test':
				this.asteroids.push(
					...[
						new Asteroid(new Vector2(0.7, 0.6), 0.06, new Vector2(250, 100), this.game),
						new Asteroid(new Vector2(-1, -1), -0.1, new Vector2(400, 400), this.game),
						new Asteroid(new Vector2(-0.4, 0), -0.05, new Vector2(700, 350), this.game),
						new Asteroid(new Vector2(0.2, 0.05), 0.04, new Vector2(40, 270), this.game),
						new Asteroid(new Vector2(0, 0), -0.5, new Vector2(160, 450), this.game),
						new Asteroid(new Vector2(0, 0), 1.2, new Vector2(540, 200), this.game),
					]
				)
				this.planets.push(
					...[
						new Planet('planet1', 25, new Composition(0, 0, 0, 0, 0, 0), new Vector2(500, 100), this.game),
						new Planet('planet2', 24, new Composition(0, 0, 0, 0, 0, 0), new Vector2(100, 500), this.game),
						new Planet('planet3', 30, new Composition(0, 0, 0, 0, 0, 0), new Vector2(600, 350), this.game),
						new Planet('planet4', 35, new Composition(0, 0, 0, 0, 0, 0), new Vector2(240, 190), this.game),
						new Planet('planet5', 15, new Composition(0, 0, 0, 0, 0, 0), new Vector2(330, 440), this.game),
						new Planet('planet6', 40, new Composition(0, 0, 0, 0, 0, 0), new Vector2(40, 90), this.game),
						new Planet('planet7', 28, new Composition(0, 0, 0, 0, 0, 0), new Vector2(110, 60), this.game),
						new Planet('planet8', 18, new Composition(0, 0, 0, 0, 0, 0), new Vector2(140, 230), this.game),
						new Planet('planet9', 22, new Composition(0, 0, 0, 0, 0, 0), new Vector2(190, 210), this.game),
						new Planet('planet10', 21, new Composition(0, 0, 0, 0, 0, 0), new Vector2(260, 460), this.game),
						new Planet('planet11', 22, new Composition(0, 0, 0, 0, 0, 0), new Vector2(370, 270), this.game),
						new Planet('planet12', 23, new Composition(0, 0, 0, 0, 0, 0), new Vector2(340, 400), this.game),
						new Planet('planet13', 24, new Composition(0, 0, 0, 0, 0, 0), new Vector2(680, 110), this.game),
						new Planet('planet14', 25, new Composition(0, 0, 0, 0, 0, 0), new Vector2(630, 480), this.game),
					]
				)

				this.asteroidLaunchers.push(new AsteroidLauncher(this.game, new Vector2(-50, -50), 4, 10, (Math.PI * 3) / 4))
				break
			case 'Alpha Centauri System':
				this.asteroids.push(
					...[
						new Asteroid(new Vector2(0, 0), 0, new Vector2(200, 420), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(130, 170), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(430, 110), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(680, 380), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(460, 310), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(40, 280), this.game),
					]
				)
				this.warpGates.push(...[new WarpGate('Kepler 438 System', new Vector2(32, 39), this.game)])
				break
			case 'Aquarii System':
				this.asteroids.push(
					...[
						new Asteroid(new Vector2(0, 0), 0, new Vector2(230, 90), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(210, 130), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(160, 440), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(110, 280), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(30, 320), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(490, 230), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(700, 40), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(630, 240), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(520, 360), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(540, 490), this.game),
					]
				)
				this.warpGates.push(
					...[
						new WarpGate('Groombridge System', new Vector2(3, 16), this.game),
						new WarpGate('Kruger System', new Vector2(30, 21), this.game),
						new WarpGate('Cygni System', new Vector2(60, 21), this.game),
					]
				)
				break
			case "Barnard's Star System":
				this.asteroids.push(
					...[
						new Asteroid(new Vector2(0, 0), 0, new Vector2(40, 100), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(60, 40), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(700, 160), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(610, 370), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(370, 450), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(230, 340), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(480, 260), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(510, 190), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(170, 140), this.game),
					]
				)
				this.warpGates.push(...[new WarpGate('Wolf 359 System', new Vector2(36, 52), this.game), new WarpGate('Sirius System', new Vector2(71, 11), this.game)])
				break
			case 'Cygni System':
				this.asteroids.push(
					...[
						new Asteroid(new Vector2(0, 0), 0, new Vector2(670, 400), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(610, 310), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(310, 40), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(250, 180), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(110, 70), this.game),
					]
				)
				this.asteroidLaunchers.push(...[new AsteroidLauncher(this.game, new Vector2(610, 545), 5, 10), new AsteroidLauncher(this.game, new Vector2(210, -20), 4, 12, Math.PI / 4)])
				this.warpGates.push(
					...[
						new WarpGate('Kruger System', new Vector2(410, 310), this.game),
						new WarpGate('Aquarii System', new Vector2(510, 110), this.game),
						new WarpGate('Indi System', new Vector2(310, 410), this.game),
						new WarpGate('Yennefer System', new Vector2(140, 420), this.game),
					]
				)
				break
			case 'Groombridge System':
				this.warpGates.push(...[new WarpGate('Kruger System', new Vector2(51, 11), this.game), new WarpGate('Aquarii System', new Vector2(14, 42), this.game)])
				break
			case 'Indi System':
				this.asteroids.push(
					...[
						new Asteroid(new Vector2(0, 0), 0, new Vector2(100, 280), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(290, 350), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(410, 340), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(510, 270), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(480, 150), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(370, 140), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(700, 190), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(680, 260), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(380, 430), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(300, 500), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(60, 50), this.game),
					]
				)
				this.warpGates.push(
					...[
						new WarpGate('Kruger System', new Vector2(160, 480), this.game),
						new WarpGate('Cygni System', new Vector2(480, 160), this.game),
						new WarpGate('Yennefer System', new Vector2(50, 160), this.game),
						new WarpGate('Quaid System', new Vector2(480, 350), this.game),
					]
				)
				break
			case 'Kepler 438 System':
				// Generate asteroids at modulo offsets (to prevent hard coding large # of asteroids)
				for (let i = 0; i < 10; i++) {
					this.asteroids.push(new Asteroid(new Vector2(0, 0), 0, new Vector2(((31 + 25 * i) % 71) * 10, ((17 + 29 * i) % 53) * 10), this.game))
				}
				this.planets.push(
					...[
						new Planet('planet6', 20, new Composition(0, 0, 0, 0, 0, 0), new Vector2(690, 410), this.game),
						new Planet('planet4', 25, new Composition(0, 0, 0, 0, 0, 0), new Vector2(80, 130), this.game),
					]
				)
				this.warpGates.push(...[new WarpGate('Sol System', new Vector2(140, 370), this.game)])
				break
			case 'Kruger System':
				this.asteroids.push(
					...[
						new Asteroid(new Vector2(0, 0), 0, new Vector2(90, 260), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(210, 240), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(250, 130), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(60, 50), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(20, 110), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(680, 210), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(360, 200), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(310, 230), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(290, 490), this.game),
					]
				)
				this.warpGates.push(
					new WarpGate('Groombridge System', new Vector2(370, 90), this.game),
					new WarpGate('Aquarii System', new Vector2(110, 400), this.game),
					new WarpGate('Cygni System', new Vector2(610, 390), this.game)
				)
				break
			case 'Luyten System':
				this.asteroids.push(
					...[
						new Asteroid(new Vector2(0, 0), 0, new Vector2(180, 250), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(340, 380), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(140, 490), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(410, 270), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(360, 220), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(320, 230), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(300, 40), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(450, 310), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(650, 200), this.game),
					]
				)
				this.asteroidLaunchers.push(new AsteroidLauncher(this.game, new Vector2(0, 0), 4, 20, Math.PI / 6))
				this.warpGates.push(
					...[
						new WarpGate("Barnard's Star System", new Vector2(370, 90), this.game),
						new WarpGate('Sirius System', new Vector2(110, 400), this.game),
						new WarpGate('Wolf 359 System', new Vector2(610, 390), this.game),
					]
				)
				this.planets.push(
					...[
						new Planet('planet2', 20, new Composition(0, 0, 0, 0, 0, 0), new Vector2(450, 650), this.game),
						new Planet('planet1', 25, new Composition(0, 0, 0, 0, 0, 0), new Vector2(80, 80), this.game),
					]
				)
				break
			case 'Quaid System':
				// Generate asteroids at modulo offsets (to prevent hard coding large # of asteroids)
				for (let i = 0; i < 5; i++) {
					this.asteroids.push(new Asteroid(new Vector2(0, 0), 0, new Vector2(((51 + 41 * i) % 71) * 10, ((41 + 41 * i) % 53) * 10), this.game))
				}
				this.asteroidLaunchers.push(...[new AsteroidLauncher(this.game, new Vector2(80, 50), 4, 15), new AsteroidLauncher(this.game, new Vector2(260, 410), 7, 10)])
				this.warpGates.push(
					...[
						new WarpGate('Yennefer System', new Vector2(590, 190), this.game),
						new WarpGate('Indi System', new Vector2(410, 410), this.game),
						new WarpGate('Cygni System', new Vector2(110, 280), this.game),
						new WarpGate('Groombridge System', new Vector2(300, 160), this.game),
					]
				)
				break
			case 'Sirius System':
				this.asteroids.push(
					...[
						new Asteroid(new Vector2(0, 0), 0, new Vector2(410, 240), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(350, 120), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(470, 420), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(700, 340), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(640, 230), this.game),
					]
				)
				this.warpGates.push(
					...[
						new WarpGate('Luyten System', new Vector2(21, 43), this.game),
						new WarpGate("Barnard's Star System", new Vector2(37, 25), this.game),
						new WarpGate('Wolf 359 System', new Vector2(3, 29), this.game),
					]
				)
				break
			case 'Sol System':
				this.asteroids.push(
					...[
						new Asteroid(new Vector2(0, 0), 0, new Vector2(210, 200), this.game),
						new Asteroid(new Vector2(0.1, 0.1), 0, new Vector2(700, 40), this.game),
						new Asteroid(new Vector2(0, 0.1), 0, new Vector2(370, 480), this.game),
						new Asteroid(new Vector2(0.1, 0), 0, new Vector2(510, 50), this.game),
						new Asteroid(new Vector2(-0.1, -0.1), 0, new Vector2(110, 70), this.game),
						new Asteroid(new Vector2(-0.1, 0.1), 0, new Vector2(460, 130), this.game),
						new Asteroid(new Vector2(0.1, -0.1), 0, new Vector2(460, 310), this.game),
					]
				)
				this.warpGates.push(...[new WarpGate('Alpha Centauri System', new Vector2(243, 223), this.game)])
				break
			case 'Wolf 359 System':
				this.asteroids.push(
					...[
						new Asteroid(new Vector2(0, 0), 0, new Vector2(150, -70), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(240, 420), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(430, 450), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(510, 240), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(340, 150), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(390, 220), this.game),
						new Asteroid(new Vector2(0, 0), 0, new Vector2(280, 270), this.game),
					]
				)
				this.warpGates.push(
					...[
						new WarpGate('Luyten System', new Vector2(180, 80), this.game),
						new WarpGate('Sirius System', new Vector2(670, 100), this.game),
						new WarpGate("Barnard's Star System", new Vector2(640, 300), this.game),
					]
				)
				break
			case 'Yennefer System':
				this.warpGates.push(
					new WarpGate('Aquarii System', new Vector2(160, 480), this.game),
					new WarpGate('Cygni System', new Vector2(480, 160), this.game),
					new WarpGate('Indi System', new Vector2(50, 160), this.game),
					new WarpGate('Quaid System', new Vector2(480, 350), this.game)
				)
				break
		}
	}
	getMapData(pos: Vector2): MapData {
		//Get map data about a position for users to get data
		return {
			galaxy: this.galaxyName,
			solarSystem: this.name,
		}
	}
}

export type { MapData }
