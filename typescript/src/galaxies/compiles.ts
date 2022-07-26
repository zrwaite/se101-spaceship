import Game from "../game.js"
import { V2 } from "../helpers/Vector2.js"
import Asteroid from "../spaceObjects/asteroid.js"
import Planet from "../spaceObjects/planet.js"
import PlanetComposition from "../spaceObjects/planetComposition.js"
import WarpGate from "../spaceObjects/warpGate.js"
import Galaxy from "./galaxy.js"
import SolarSystem from "./solarSystem.js"

export const BuildCompiles = (game: Game): Galaxy => {
	const Goose = new SolarSystem("Goose", "Compiles", game, {
		asteroids: [
			new Asteroid(V2(0, 0), 0, V2(210, 200), game),
			new Asteroid(V2(0.1, 0.1), 0, V2(700, 40), game),
			new Asteroid(V2(0, 0.1), 0, V2(370, 480), game),
			new Asteroid(V2(0.1, 0), 0, V2(510, 50), game),
			new Asteroid(V2(-0.1, -0.1), 0, V2(110, 70), game),
			new Asteroid(V2(-0.1, 0.1), 0, V2(460, 130), game),
			new Asteroid(V2(0.1, -0.1), 0, V2(460, 310), game),
		],
		warpGates: [
			new WarpGate('Waterloo', V2(243, 223), game)
		],
	})
	const Waterloo = new SolarSystem("Waterloo", "Compiles", game, {
		asteroids: [
			new Asteroid(V2(0, 0), 0, V2(200, 420), game),
				new Asteroid(V2(0, 0), 0, V2(130, 170), game),
				new Asteroid(V2(0, 0), 0, V2(430, 110), game),
				new Asteroid(V2(0, 0), 0, V2(680, 380), game),
				new Asteroid(V2(0, 0), 0, V2(460, 310), game),
				new Asteroid(V2(0, 0), 0, V2(40, 280), game),
		],
		warpGates: [
			new WarpGate('StackOverflow', V2(32, 39), game)
		]
	})
	const StackOverflowAsteroids = []
	for (let i = 0; i < 10; i++) {
		StackOverflowAsteroids.push(new Asteroid(V2(0, 0), 0, V2(((31 + 25 * i) % 71) * 10, ((17 + 29 * i) % 53) * 10), game))
	}
	const StackOverflow = new SolarSystem("StackOverflow", "Compiles", game, {
		asteroids: StackOverflowAsteroids,
		planets: [
			new Planet('Steve-O', 20, new PlanetComposition(0, 0, 0, 0, 0, 0), V2(690, 410), game),
			new Planet('Fortran', 25, new PlanetComposition(0, 0, 0, 0, 0, 0), V2(80, 130), game),
		],
		warpGates: [
			new WarpGate('Goose', V2(140, 370), game)
		]
	})

	return new Galaxy('Compiles', game, [Goose, Waterloo, StackOverflow])
}