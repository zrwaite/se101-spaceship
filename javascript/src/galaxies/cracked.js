import { V2 } from '../helpers/Vector2.js';
import Asteroid from '../spaceObjects/asteroid.js';
import AsteroidLauncher from '../spaceObjects/asteroidLauncher.js';
import Planet from '../spaceObjects/planet.js';
import WarpGate from '../spaceObjects/warpGate.js';
import Galaxy from './galaxy.js';
import SolarSystem from './solarSystem.js';
export const BuildCracked = (game) => {
    /*
         Hargun		<---
    ▲			▲		|
    |			|		|
    ▼      		|		|
    Olivia <--> Ali		|
    ▲			▲		|
    |			|		|
    |      		▼		|
        Derek 	  -------
    */
    const Hargun = new SolarSystem('Hargun', 'Compiles', game, {
        asteroids: [
            new Asteroid(V2(0.1, 0), V2(40, 100), game),
            new Asteroid(V2(0.4, 0.3), V2(60, 40), game),
            new Asteroid(V2(-0.3, 0.1), V2(700, 160), game),
            new Asteroid(V2(-0.2, -0.2), V2(610, 370), game),
            new Asteroid(V2(0.3, 0.1), V2(370, 450), game),
            new Asteroid(V2(0.1, 0.2), V2(230, 340), game),
            new Asteroid(V2(0.2, -0.1), V2(480, 260), game),
            new Asteroid(V2(-0.5, 0.5), V2(510, 190), game),
            new Asteroid(V2(0.1, -0.1), V2(170, 140), game)
        ],
        warpGates: [
            new WarpGate('Olivia', V2(360, 500), game),
        ],
        asteroidLaunchers: [
            new AsteroidLauncher(game, V2(350, 560), V2(200, 300)),
            new AsteroidLauncher(game, V2(50, 560), V2(100, 400)),
            new AsteroidLauncher(game, V2(740, 240), V2(1, 300))
        ]
    });
    const Olivia = new SolarSystem('Olivia', 'Compiles', game, {
        asteroids: [
            new Asteroid(V2(0.6, 0.4), V2(1, 310), game),
            new Asteroid(V2(-0.6, -0.4), V2(719, 230), game),
            new Asteroid(V2(-0.6, 0.4), V2(320, 1), game),
            new Asteroid(V2(0.6, -0.4), V2(400, 539), game),
        ],
        warpGates: [
            new WarpGate('Ali', V2(680, 60), game),
            new WarpGate('Hargun', V2(40, 50), game),
        ],
        asteroidLaunchers: [
            new AsteroidLauncher(game, V2(-20, 270), V2(1, 310), false, 3),
            new AsteroidLauncher(game, V2(740, 270), V2(719, 230), false, 3),
            new AsteroidLauncher(game, V2(360, -20), V2(320, 1), false, 3),
            new AsteroidLauncher(game, V2(360, 560), V2(400, 539), false, 3),
        ]
    });
    const Ali = new SolarSystem('Ali', 'Compiles', game, {
        asteroids: [
        // new Asteroid(V2(0.1, 0.4), 
        ],
        warpGates: [
            new WarpGate('Derek', V2(400, 290), game),
            new WarpGate('Hargun', V2(360, 250), game),
            new WarpGate('Olivia', V2(320, 290), game),
        ],
        asteroidLaunchers: [
            new AsteroidLauncher(game, V2(100, -20), V2(120, 20), false, 4),
            new AsteroidLauncher(game, V2(200, -20), V2(220, 20), false, 4),
            new AsteroidLauncher(game, V2(300, -20), V2(320, 20), false, 4),
            new AsteroidLauncher(game, V2(400, -20), V2(420, 20), false, 4),
            new AsteroidLauncher(game, V2(500, -20), V2(520, 20), false, 4),
            new AsteroidLauncher(game, V2(600, -20), V2(620, 20), false, 4),
        ]
    });
    const Derek = new SolarSystem('Derek', 'Compiles', game, {
        asteroids: [
            new Asteroid(V2(0, 0), V2(180, 250), game),
            new Asteroid(V2(0, 0), V2(340, 380), game),
            new Asteroid(V2(0, 0), V2(140, 490), game),
            new Asteroid(V2(0, 0), V2(410, 270), game),
            new Asteroid(V2(0, 0), V2(360, 220), game),
            new Asteroid(V2(0, 0), V2(320, 230), game),
            new Asteroid(V2(0, 0), V2(300, 40), game),
            new Asteroid(V2(0, 0), V2(450, 310), game),
            new Asteroid(V2(0, 0), V2(650, 200), game),
        ],
        asteroidLaunchers: [
            new AsteroidLauncher(game, V2(-20, -20), V2(1, 1))
        ],
        warpGates: [
            new WarpGate('Hargun', V2(370, 90), game),
            new WarpGate('Ali', V2(110, 400), game),
            new WarpGate('Olivia', V2(610, 390), game),
        ],
        planets: [
            new Planet('Abysmal', 20, V2(450, 450), game),
            new Planet('Exceptional', 25, V2(380, 380), game),
        ],
    });
    return new Galaxy('Cracked', game, [Hargun, Olivia, Ali, Derek]);
};
