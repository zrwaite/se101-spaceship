import Game from "../game.js"
import { V2 } from "../helpers/Vector2.js"
import Asteroid from "../spaceObjects/asteroid.js"
import AsteroidLauncher from "../spaceObjects/asteroidLauncher.js"
import Planet from "../spaceObjects/planet.js"
import WarpGate from "../spaceObjects/warpGate.js"
import Galaxy from "./galaxy.js"
import SolarSystem from "./solarSystem.js"

export const BuildCompiles = (game: Game): Galaxy => {
	/*
	Goose --> Waterloo --> StackOverflow --> Goose
	*/
	const Goose = new SolarSystem("Goose", "Compiles", game, {
		asteroids: [
			new Asteroid(V2(0, 0), 0, V2(210, 200), game),
			new Asteroid(V2(-0.3, 0), 0, V2(700, 40), game),
			new Asteroid(V2(-0.2, -0.3), 0, V2(370, 480), game),
			new Asteroid(V2(-0.4, 0), 0, V2(510, 50), game),
			new Asteroid(V2(-0.2, -0.2), 0, V2(110, 95), game),
			new Asteroid(V2(-0.2, 0.1), 0, V2(460, 130), game),
			new Asteroid(V2(-0.2, -0.2), 0, V2(460, 310), game),
		],
		warpGates: [
			new WarpGate('Waterloo', V2(343, 323), game)
		],
	})
	const Waterloo = new SolarSystem("Waterloo", "Compiles", game, {
		asteroids: [
			new Asteroid(V2(0.1, 0), 0, V2(200, 420), game),
			new Asteroid(V2(0.1, 0.2), 0, V2(130, 170), game),
			new Asteroid(V2(0.2, 0.2), 0, V2(430, 110), game),
			new Asteroid(V2(-0.3, -0.3), 0, V2(680, 380), game),
			new Asteroid(V2(-0.4, 0.4), 0, V2(460, 310), game),
			new Asteroid(V2(0.5, -0.5), 0, V2(40, 280), game),
		],
		warpGates: [
			new WarpGate('StackOverflow', V2(32, 39), game)
		],
		asteroidLaunchers: [
			new AsteroidLauncher(game, V2(220, -20), V2(150, 150)),
		]
	})
	const StackOverflowAsteroids = []
	for (let i = 0; i < 10; i++) {
		StackOverflowAsteroids.push(new Asteroid(V2(Math.random()-0.5, Math.random()-0.5), 0, V2(((31 + 25 * i) % 71) * 10, ((17 + 29 * i) % 53) * 10), game))
	}
	const StackOverflow = new SolarSystem("StackOverflow", "Compiles", game, {
		asteroids: StackOverflowAsteroids,
		planets: [
			new Planet('Steve-O', 20, V2(690, 410), game),
			new Planet('Fortran', 25,  V2(80, 400), game),
		],
		warpGates: [
			new WarpGate('Goose', V2(140, 270), game)
		],
		asteroidLaunchers: [
			new AsteroidLauncher(game, V2(-20, 320), V2(450, 450)),
			new AsteroidLauncher(game, V2(740, 300), V2(400, 400)),
		]
	})

	return new Galaxy('Compiles', game, [Goose, Waterloo, StackOverflow])
}