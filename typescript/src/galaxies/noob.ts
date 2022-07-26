import Game from "../game.js"
import { V2 } from "../helpers/Vector2.js"
import Asteroid from "../spaceObjects/asteroid.js"
import AsteroidLauncher from "../spaceObjects/asteroidLauncher.js"
import Planet from "../spaceObjects/planet.js"
import PlanetComposition from "../spaceObjects/planetComposition.js"
import Galaxy from "./galaxy.js"
import SolarSystem from "./solarSystem.js"

export const BuildNoob = (game: Game): Galaxy => {
	const Tutorial = new SolarSystem("Tutorial", "Noob", game, {
		asteroids: [
			new Asteroid(V2(-0.5, -0.1), 0.06, V2(300, 90), game), 
			new Asteroid(V2(-0.1, -0.5), 0.06, V2(90, 300), game)
		],
		planets: [
			new Planet('Big Bird', 25, new PlanetComposition(0, 0, 0, 0, 0, 0), V2(500, 400), game)
		],
		asteroidLaunchers: [
			new AsteroidLauncher(game, V2(740, 560), V2(30, 30))
		],
	})
	return new Galaxy('Noob', game, [Tutorial])
}