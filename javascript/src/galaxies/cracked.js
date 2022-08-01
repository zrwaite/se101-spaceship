import { V2 } from "../helpers/Vector2.js";
import Asteroid from "../spaceObjects/asteroid.js";
import AsteroidLauncher from "../spaceObjects/asteroidLauncher.js";
import Planet from "../spaceObjects/planet.js";
import Star from "../spaceObjects/star.js";
import WarpGate from "../spaceObjects/warpGate.js";
import Galaxy from "./galaxy.js";
import SolarSystem from "./solarSystem.js";
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
    const Hargun = new SolarSystem("Hargun", "Compiles", game, {
        asteroids: [
            new Asteroid(V2(0.1, 0), 0, V2(40, 100), game),
            new Asteroid(V2(0.4, 0.3), 0, V2(60, 40), game),
            new Asteroid(V2(-0.3, 0.1), 0, V2(700, 160), game),
            new Asteroid(V2(-0.2, -0.2), 0, V2(610, 370), game),
            new Asteroid(V2(0.3, 0.1), 0, V2(370, 450), game),
            new Asteroid(V2(0.1, 0.2), 0, V2(230, 340), game),
            new Asteroid(V2(0.2, -0.1), 0, V2(480, 260), game),
            new Asteroid(V2(-0.5, 0.5), 0, V2(510, 190), game),
            new Asteroid(V2(0.1, -0.1), 0, V2(170, 140), game)
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
    const Olivia = new SolarSystem("Olivia", "Compiles", game, {
        asteroids: [
            new Asteroid(V2(0, 0), 0, V2(150, -70), game),
            new Asteroid(V2(0, 0), 0, V2(240, 420), game),
            new Asteroid(V2(0, 0), 0, V2(430, 450), game),
            new Asteroid(V2(0, 0), 0, V2(510, 240), game),
            new Asteroid(V2(0, 0), 0, V2(340, 150), game),
            new Asteroid(V2(0, 0), 0, V2(390, 220), game),
            new Asteroid(V2(0, 0), 0, V2(280, 270), game),
        ],
        warpGates: [
            new WarpGate('Ali', V2(670, 100), game),
            new WarpGate("Hargun", V2(640, 300), game),
        ]
    });
    const Ali = new SolarSystem("Ali", "Compiles", game, {
        asteroids: [
            new Asteroid(V2(0, 0), 0, V2(410, 240), game),
            new Asteroid(V2(0, 0), 0, V2(350, 120), game),
            new Asteroid(V2(0, 0), 0, V2(470, 420), game),
            new Asteroid(V2(0, 0), 0, V2(700, 340), game),
            new Asteroid(V2(0, 0), 0, V2(640, 230), game),
        ],
        warpGates: [
            new WarpGate('Derek', V2(400, 290), game),
            new WarpGate("Hargun", V2(360, 250), game),
            new WarpGate('Olivia', V2(320, 290), game),
        ]
    });
    const DerekStar = new Star(V2(360, 270), game);
    const Derek = new SolarSystem("Derek", "Compiles", game, {
        asteroids: [
            new Asteroid(V2(0, 0), 0, V2(180, 250), game),
            new Asteroid(V2(0, 0), 0, V2(340, 380), game),
            new Asteroid(V2(0, 0), 0, V2(140, 490), game),
            new Asteroid(V2(0, 0), 0, V2(410, 270), game),
            new Asteroid(V2(0, 0), 0, V2(360, 220), game),
            new Asteroid(V2(0, 0), 0, V2(320, 230), game),
            new Asteroid(V2(0, 0), 0, V2(300, 40), game),
            new Asteroid(V2(0, 0), 0, V2(450, 310), game),
            new Asteroid(V2(0, 0), 0, V2(650, 200), game),
        ],
        asteroidLaunchers: [
            new AsteroidLauncher(game, V2(-20, -20), V2(1, 1))
        ],
        warpGates: [
            new WarpGate("Hargun", V2(370, 90), game),
            new WarpGate('Ali', V2(110, 400), game),
            new WarpGate('Olivia', V2(610, 390), game),
        ],
        planets: [
            new Planet('Abysmal', 20, V2(450, 450), game),
            new Planet('Exceptional', 25, V2(380, 380), game),
        ],
        star: DerekStar
    });
    Derek.planets.forEach(planet => planet.setOrbit(DerekStar));
    // Derek.activate = () => {
    // 	TutorialStar.collapse(500)
    // }
    return new Galaxy('Cracked', game, [Hargun, Olivia, Ali, Derek]);
};
