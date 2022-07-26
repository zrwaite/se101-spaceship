import Vector2 from './helpers/Vector2.js';
import Asteroid from './spaceObjects/asteroid.js';
import WarpGate from './spaceObjects/warpGate.js';
import Planet from './spaceObjects/planet.js';
import AsteroidLauncher from './spaceObjects/asteroidLauncher.js';
import Composition from './spaceObjects/planetComposition.js';
const SolarSystemNames = [
    'Tutorial',
    'Goose',
    'Waterloo',
    'StackOverflow',
    'Hargun',
    'Olivia',
    'Derek',
    'Ali',
    'ECE105',
    'Torvalds',
    'Zac',
    'Josiah',
    'Elon',
    'Gates',
    'Turing'
];
//The constructor is going to build the levels
//Think of this as a sort of level builder
export default class SolarSystem {
    constructor(solarSystemName, galaxyName, game) {
        this.shipStartPosition = new Vector2(300, 300);
        this.game = game;
        this.galaxyName = galaxyName;
        this.name = solarSystemName;
        this.asteroids = [];
        this.warpGates = [];
        this.planets = [];
        this.asteroidLaunchers = [];
        switch (solarSystemName) {
            case 'Tutorial':
                this.asteroids.push(...[new Asteroid(new Vector2(-0.5, -0.1), 0.06, new Vector2(300, 90), this.game), new Asteroid(new Vector2(-0.1, -0.5), 0.06, new Vector2(90, 300), this.game)]);
                this.planets.push(new Planet('Big Bird', 25, new Composition(0, 0, 0, 0, 0, 0), new Vector2(500, 400), this.game));
                this.asteroidLaunchers.push(new AsteroidLauncher(this.game, new Vector2(740, 560), new Vector2(30, 30)));
                break;
            case 'Goose':
                this.asteroids.push(...[
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(210, 200), this.game),
                    new Asteroid(new Vector2(0.1, 0.1), 0, new Vector2(700, 40), this.game),
                    new Asteroid(new Vector2(0, 0.1), 0, new Vector2(370, 480), this.game),
                    new Asteroid(new Vector2(0.1, 0), 0, new Vector2(510, 50), this.game),
                    new Asteroid(new Vector2(-0.1, -0.1), 0, new Vector2(110, 70), this.game),
                    new Asteroid(new Vector2(-0.1, 0.1), 0, new Vector2(460, 130), this.game),
                    new Asteroid(new Vector2(0.1, -0.1), 0, new Vector2(460, 310), this.game),
                ]);
                this.warpGates.push(...[new WarpGate('Waterloo', new Vector2(243, 223), this.game)]);
                break;
            case 'Waterloo':
                this.asteroids.push(...[
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(200, 420), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(130, 170), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(430, 110), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(680, 380), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(460, 310), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(40, 280), this.game),
                ]);
                this.warpGates.push(...[new WarpGate('StackOverflow', new Vector2(32, 39), this.game)]);
                break;
            case 'StackOverflow':
                // Generate asteroids at modulo offsets (to prevent hard coding large # of asteroids)
                for (let i = 0; i < 10; i++) {
                    this.asteroids.push(new Asteroid(new Vector2(0, 0), 0, new Vector2(((31 + 25 * i) % 71) * 10, ((17 + 29 * i) % 53) * 10), this.game));
                }
                this.planets.push(...[
                    new Planet('Steve-O', 20, new Composition(0, 0, 0, 0, 0, 0), new Vector2(690, 410), this.game),
                    new Planet('Fortran', 25, new Composition(0, 0, 0, 0, 0, 0), new Vector2(80, 130), this.game),
                ]);
                this.warpGates.push(...[new WarpGate('Goose', new Vector2(140, 370), this.game)]);
                break;
            case 'Gates':
                this.asteroids.push(...[
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
                ]);
                this.warpGates.push(...[
                    new WarpGate('ECE105', new Vector2(3, 16), this.game),
                    new WarpGate('Torvalds', new Vector2(30, 21), this.game),
                    new WarpGate('Elon', new Vector2(60, 21), this.game),
                ]);
                break;
            case "Hargun":
                this.asteroids.push(new Asteroid(new Vector2(0.1, 0), 0, new Vector2(40, 100), this.game), new Asteroid(new Vector2(0.4, 0.3), 0, new Vector2(60, 40), this.game), new Asteroid(new Vector2(-0.3, 0.1), 0, new Vector2(700, 160), this.game), new Asteroid(new Vector2(-0.2, -0.2), 0, new Vector2(610, 370), this.game), new Asteroid(new Vector2(0.3, 0.1), 0, new Vector2(370, 450), this.game), new Asteroid(new Vector2(0.1, 0.2), 0, new Vector2(230, 340), this.game), new Asteroid(new Vector2(0.2, -0.1), 0, new Vector2(480, 260), this.game), new Asteroid(new Vector2(-0.5, 0.5), 0, new Vector2(510, 190), this.game), new Asteroid(new Vector2(0.1, -0.1), 0, new Vector2(170, 140), this.game));
                this.warpGates.push(...[new WarpGate('Olivia', new Vector2(36, 52), this.game), new WarpGate('Ali', new Vector2(71, 11), this.game)]);
                this.asteroidLaunchers.push(new AsteroidLauncher(this.game, new Vector2(350, 560), new Vector2(200, 300)), new AsteroidLauncher(this.game, new Vector2(50, 560), new Vector2(100, 400)), new AsteroidLauncher(this.game, new Vector2(740, 240), new Vector2(1, 300)));
                break;
            case 'Elon':
                this.asteroids.push(new Asteroid(new Vector2(0.1, 0), 0, new Vector2(670, 400), this.game), new Asteroid(new Vector2(0, 0.2), 0, new Vector2(610, 310), this.game), new Asteroid(new Vector2(0.1, 0.1), 0, new Vector2(310, 40), this.game), new Asteroid(new Vector2(0.2, 0.1), 0, new Vector2(250, 180), this.game), new Asteroid(new Vector2(0.3, 0.2), 0, new Vector2(110, 70), this.game));
                this.asteroidLaunchers.push(...[new AsteroidLauncher(this.game, new Vector2(610, 565), new Vector2(500, 350), true), new AsteroidLauncher(this.game, new Vector2(210, -20), new Vector2(230, 40), true, 5)]);
                this.warpGates.push(...[
                    new WarpGate('Torvalds', new Vector2(410, 310), this.game),
                    new WarpGate('Gates', new Vector2(510, 110), this.game),
                    new WarpGate('Josiah', new Vector2(310, 410), this.game),
                    new WarpGate('Zac', new Vector2(140, 420), this.game),
                ]);
                break;
            case 'ECE105':
                this.warpGates.push(...[new WarpGate('Torvalds', new Vector2(51, 411), this.game), new WarpGate('Gates', new Vector2(640, 80), this.game)]);
                for (let i = 0; i < 12; i++) {
                    const x = (i + 1) * 50;
                    const y = Math.random() * 400 + 50;
                    this.asteroids.push(new Asteroid(new Vector2(-x / 500, -y / 500), Math.random(), new Vector2(x, y), this.game));
                    const xRatio = 720 / x;
                    const yRatio = 540 / y;
                    const ratio = Math.min(xRatio, yRatio);
                    try {
                        this.asteroidLaunchers.push(new AsteroidLauncher(this.game, new Vector2(x, y).scale(ratio).add(new Vector2(20, 20)), new Vector2(80, 80), true));
                    }
                    catch (e) {
                        console.log(e);
                        console.log(x, y, ratio);
                    }
                }
                break;
            case 'Josiah':
                this.asteroids.push(...[
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
                ]);
                this.warpGates.push(...[
                    new WarpGate('Torvalds', new Vector2(160, 480), this.game),
                    new WarpGate('Elon', new Vector2(480, 160), this.game),
                    new WarpGate('Zac', new Vector2(50, 160), this.game),
                    new WarpGate('Turing', new Vector2(480, 350), this.game),
                ]);
                break;
            case 'Torvalds':
                this.asteroids.push(...[
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(90, 260), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(210, 240), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(250, 130), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(60, 50), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(20, 110), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(680, 210), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(360, 200), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(310, 230), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(290, 490), this.game),
                ]);
                this.warpGates.push(new WarpGate('ECE105', new Vector2(370, 90), this.game), new WarpGate('Gates', new Vector2(110, 400), this.game), new WarpGate('Elon', new Vector2(610, 390), this.game));
                break;
            case 'Derek':
                this.asteroids.push(...[
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(180, 250), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(340, 380), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(140, 490), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(410, 270), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(360, 220), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(320, 230), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(300, 40), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(450, 310), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(650, 200), this.game),
                ]);
                this.asteroidLaunchers.push(new AsteroidLauncher(this.game, new Vector2(-20, -20), new Vector2(1, 1)));
                this.warpGates.push(...[
                    new WarpGate("Hargun", new Vector2(370, 90), this.game),
                    new WarpGate('Ali', new Vector2(110, 400), this.game),
                    new WarpGate('Olivia', new Vector2(610, 390), this.game),
                ]);
                this.planets.push(...[
                    new Planet('Abysmal', 20, new Composition(0, 0, 0, 0, 0, 0), new Vector2(450, 650), this.game),
                    new Planet('Exceptional', 25, new Composition(0, 0, 0, 0, 0, 0), new Vector2(80, 80), this.game),
                ]);
                break;
            case 'Turing':
                // Generate asteroids at modulo offsets (to prevent hard coding large # of asteroids)
                for (let i = 0; i < 5; i++) {
                    this.asteroids.push(new Asteroid(new Vector2(0, 0), 0, new Vector2(((51 + 41 * i) % 71) * 10, ((41 + 41 * i) % 53) * 10), this.game));
                }
                this.asteroidLaunchers.push(...[new AsteroidLauncher(this.game, new Vector2(-80, 50), new Vector2(300, 300)), new AsteroidLauncher(this.game, new Vector2(-10, 410), new Vector2(200, 200), true, 5)]);
                this.warpGates.push(...[
                    new WarpGate('Zac', new Vector2(590, 190), this.game),
                    new WarpGate('Josiah', new Vector2(410, 410), this.game),
                    new WarpGate('Elon', new Vector2(110, 280), this.game),
                    new WarpGate('ECE105', new Vector2(300, 160), this.game),
                ]);
                break;
            case 'Ali':
                this.asteroids.push(...[
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(410, 240), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(350, 120), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(470, 420), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(700, 340), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(640, 230), this.game),
                ]);
                this.warpGates.push(...[
                    new WarpGate('Derek', new Vector2(21, 43), this.game),
                    new WarpGate("Hargun", new Vector2(37, 25), this.game),
                    new WarpGate('Olivia', new Vector2(3, 29), this.game),
                ]);
                break;
            case 'Olivia':
                this.asteroids.push(...[
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(150, -70), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(240, 420), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(430, 450), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(510, 240), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(340, 150), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(390, 220), this.game),
                    new Asteroid(new Vector2(0, 0), 0, new Vector2(280, 270), this.game),
                ]);
                this.warpGates.push(...[
                    new WarpGate('Derek', new Vector2(180, 80), this.game),
                    new WarpGate('Ali', new Vector2(670, 100), this.game),
                    new WarpGate("Hargun", new Vector2(640, 300), this.game),
                ]);
                break;
            case 'Zac':
                this.warpGates.push(new WarpGate('Gates', new Vector2(160, 480), this.game), new WarpGate('Elon', new Vector2(480, 160), this.game), new WarpGate('Josiah', new Vector2(50, 160), this.game), new WarpGate('Turing', new Vector2(480, 350), this.game));
                break;
        }
    }
    getMapData(pos) {
        //Get map data about a position for users to get data
        return {
            galaxy: this.galaxyName,
            solarSystem: this.name,
        };
    }
}
