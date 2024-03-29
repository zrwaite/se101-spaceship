import { V2 } from '../helpers/Vector2.js';
import Asteroid from '../spaceObjects/asteroid.js';
import Planet from '../spaceObjects/planet.js';
import Galaxy from './galaxy.js';
import SolarSystem from './solarSystem.js';
export const BuildNoob = (game) => {
    const Tutorial = new SolarSystem('Tutorial', 'Noob', game, {
        asteroids: [
            new Asteroid(V2(-0.5, -0.15), V2(300, 90), game),
            new Asteroid(V2(0, 0), V2(526, 392), game)
        ],
        planets: [new Planet('Big Bird', 35, V2(576, 432), game)],
    });
    console.log(`Welcome to the tutorial - your goal is to find the planet and land on it.
Avoid any asteroids that get in the way if you can.
Good luck!`);
    return new Galaxy('Noob', game, [Tutorial]);
};
