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
            new Asteroid(V2(0.1, 0.5), V2(100, 20), game),
            new Asteroid(V2(-0.1, 0.52), V2(200, 20), game),
            new Asteroid(V2(0, 0.5), V2(300, 30), game),
            new Asteroid(V2(-0.2, 0.4), V2(390, 10), game),
            new Asteroid(V2(0.1, 0.51), V2(500, 20), game),
            new Asteroid(V2(0, 0.68), V2(610, 20), game),
            new Asteroid(V2(0.1, 0.54), V2(100, 320), game),
            new Asteroid(V2(0.1, 0.5), V2(200, 325), game),
            new Asteroid(V2(0.1, 0.5), V2(310, 330), game),
            new Asteroid(V2(0, 0.5), V2(400, 320), game),
            new Asteroid(V2(-0.1, 0.6), V2(500, 320), game),
            new Asteroid(V2(0.2, 0.6), V2(600, 320), game),
        ],
        warpGates: [
            new WarpGate('Derek', V2(320, 210), game),
            new WarpGate('Hargun', V2(360, 250), game),
            new WarpGate('Olivia', V2(400, 210), game),
        ],
        asteroidLaunchers: [
            new AsteroidLauncher(game, V2(100, -20), V2(100, 20), true, 4),
            new AsteroidLauncher(game, V2(200, -20), V2(200, 20), true, 4),
            new AsteroidLauncher(game, V2(300, -20), V2(300, 20), true, 4),
            new AsteroidLauncher(game, V2(400, -20), V2(400, 20), true, 4),
            new AsteroidLauncher(game, V2(500, -20), V2(500, 20), true, 4),
            new AsteroidLauncher(game, V2(600, -20), V2(600, 20), true, 4),
        ],
        planets: [
            new Planet('Pluto', 30, V2(450, 450), game),
        ]
    });
    const Derek = new SolarSystem('Derek', 'Compiles', game, {
        asteroids: [
            new Asteroid(V2(0, 0), V2(300, 457), game),
            new Asteroid(V2(0, 0), V2(300, 372), game),
            new Asteroid(V2(0, 0), V2(340, 511), game),
            new Asteroid(V2(0, 0), V2(380, 532), game),
            new Asteroid(V2(0, 0), V2(380, 297), game),
            new Asteroid(V2(0, 0), V2(420, 537), game),
            new Asteroid(V2(0, 0), V2(420, 292), game),
            new Asteroid(V2(0, 0), V2(460, 528), game),
            new Asteroid(V2(0, 0), V2(460, 301), game),
            new Asteroid(V2(0, 0), V2(500, 326), game),
            new Asteroid(V2(0, 0), V2(540, 425), game),
            new Asteroid(V2(0, 0), V2(535, 390), game),
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
            new Planet('Abysmal', 30, V2(450, 450), game),
            new Planet('Exceptional', 35, V2(380, 380), game),
        ],
    });
    console.log(`Now this galaxy is tough.
The warp gates create a maze - don't end up in a geographical while(true) loop.
Make sure to find the best planet you can - even if it takes a while!
`);
    return new Galaxy('Cracked', game, [Hargun, Olivia, Ali, Derek]);
};
