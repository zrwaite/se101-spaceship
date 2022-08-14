import Game from "../game.js"
import Vector2, { V2 } from "../helpers/Vector2.js"
import Asteroid from "../spaceObjects/asteroid.js"
import AsteroidLauncher from "../spaceObjects/asteroidLauncher.js"
import Planet from "../spaceObjects/planet.js"
import Star from "../spaceObjects/star.js"
import WarpGate from "../spaceObjects/warpGate.js"
import Galaxy from "./galaxy.js"
import SolarSystem from "./solarSystem.js"

export const BuildJoziac = (game: Game): Galaxy => {
	/*
				 ▲--▼
				ECE105		  <---------
		  ▲					▲			|
		  |					|			|
		  ▼					▼			|
	-->	Gates	<--->	Torvalds <--	|
	|	  ▲					▲		|	|	
	|	  |					|		|	|	
	|	  ▼					▼		|	|	
	|			Elon				|	|	
	|	  ▲					▲		|	|	
	|	  |					|		|	|
	|	  ▼					▼		|	|
	 --  Zac    <--->	 Josiah  ---	|
		  ▲					▲			|
		  |					|			|
		  ▼					▼			|
				Turing            ------
	*/

	const ECE105Asteroids = []
	const ECE105AsteroidLaunchers = []
	for (let i = 0; i < 12; i++) {
		const x = (i + 1) * 50
		const y = Math.random() * 400 + 50
		ECE105Asteroids.push(new Asteroid(V2(-x / 500, -y / 500), V2(x, y), game))
		const xRatio = 720 / x
		const yRatio = 540 / y
		const ratio = Math.min(xRatio, yRatio)
		try {
			ECE105AsteroidLaunchers.push(new AsteroidLauncher(game, V2(x, y).scale(ratio).add(V2(20, 20)), V2(80, 80), true))
		} catch (e) {
			console.log(e)
			console.log(x, y, ratio)
		}
	}

	const ECE105 = new SolarSystem("ECE105", "Joziac", game, {
		asteroids: ECE105Asteroids,
		asteroidLaunchers: ECE105AsteroidLaunchers,
		warpGates: [
			new WarpGate('Torvalds', V2(51, 411), game), 
			new WarpGate('Gates', V2(500, 500), game),
			new WarpGate('ECE105', V2(50, 80), game)
		]
	})

	const Gates = new SolarSystem("Gates", "Joziac", game, {
		asteroids: [
			new Asteroid(V2(0, 0), V2(230, 90), game),
			new Asteroid(V2(0, 0), V2(210, 130), game),
			new Asteroid(V2(0, 0), V2(160, 440), game),
			new Asteroid(V2(0, 0), V2(110, 280), game),
			new Asteroid(V2(0, 0), V2(30, 320), game),
			new Asteroid(V2(0, 0), V2(490, 230), game),
			new Asteroid(V2(0, 0), V2(700, 40), game),
			new Asteroid(V2(0, 0), V2(630, 240), game),
			new Asteroid(V2(0, 0), V2(520, 360), game),
			new Asteroid(V2(0, 0), V2(540, 490), game),
		],
		warpGates: [
			new WarpGate('ECE105', V2(3, 16), game),
			new WarpGate('Torvalds', V2(30, 21), game),
			new WarpGate('Elon', V2(60, 21), game),
		]
	})

	const Torvalds = new SolarSystem("Torvalds", "Joziac", game, {
		asteroids: [
			new Asteroid(V2(0, 0), V2(90, 260), game),
			new Asteroid(V2(0, 0), V2(210, 240), game),
			new Asteroid(V2(0, 0), V2(250, 130), game),
			new Asteroid(V2(0, 0), V2(60, 50), game),
			new Asteroid(V2(0, 0), V2(20, 110), game),
			new Asteroid(V2(0, 0), V2(680, 210), game),
			new Asteroid(V2(0, 0), V2(360, 200), game),
			new Asteroid(V2(0, 0), V2(310, 230), game),
			new Asteroid(V2(0, 0), V2(290, 490), game),
		],
		warpGates: [
			new WarpGate('ECE105', V2(370, 90), game),
			new WarpGate('Gates', V2(110, 400), game),
			new WarpGate('Elon', V2(610, 390), game)
		]
	})

	const Elon = new SolarSystem("Elon", "Joziac", game, {
		asteroids: [
			new Asteroid(V2(0.1, 0), V2(670, 400), game),
			new Asteroid(V2(0, 0.2), V2(610, 310), game),
			new Asteroid(V2(0.1, 0.1), V2(310, 40), game),
			new Asteroid(V2(0.2, 0.1), V2(250, 180), game),
			new Asteroid(V2(0.3, 0.2), V2(110, 70), game)
		],
		asteroidLaunchers: [
			new AsteroidLauncher(game, V2(610, 565), V2(500, 350), true), 
			new AsteroidLauncher(game, V2(210, -20), V2(230, 40), true, 5)
		],
		warpGates: [
			new WarpGate('Torvalds', V2(410, 310), game),
			new WarpGate('Gates', V2(510, 110), game),
			new WarpGate('Josiah', V2(310, 410), game),
			new WarpGate('Zac', V2(140, 420), game),
		],
		planets: [
			new Planet('Planet Three (no Planet One)', 40, V2(300, 300), game),
			new Planet('Notch', 25, V2(600, 500), game),
		]
	})

	
	const Josiah = new SolarSystem("Josiah", "Joziac", game, {
		asteroids: [
			new Asteroid(V2(0, 0), V2(100, 280), game),
			new Asteroid(V2(0, 0), V2(290, 350), game),
			new Asteroid(V2(0, 0), V2(410, 340), game),
			new Asteroid(V2(0, 0), V2(510, 270), game),
			new Asteroid(V2(0, 0), V2(480, 150), game),
			new Asteroid(V2(0, 0), V2(370, 140), game),
			new Asteroid(V2(0, 0), V2(700, 190), game),
			new Asteroid(V2(0, 0), V2(680, 260), game),
			new Asteroid(V2(0, 0), V2(380, 430), game),
			new Asteroid(V2(0, 0), V2(300, 500), game),
			new Asteroid(V2(0, 0), V2(60, 50), game),
		],
		warpGates: [
			new WarpGate('Torvalds', V2(160, 480), game),
			new WarpGate('Elon', V2(480, 160), game),
			new WarpGate('Zac', V2(50, 160), game),
			new WarpGate('Turing', V2(480, 350), game),
		],
		planets: [
			new Planet('Planet Two', 43, V2(380, 510), game),
			new Planet('Esquimalt', 33, V2(620, 380), game),
			new Planet('Fortran', 37, V2(520, 480), game),
			new Planet('Melony', 49, V2(20, 380), game),
		],
	})
	const ZacStar = new Star(V2(350, 300), game)
	const Zac = new SolarSystem("Zac", "Joziac", game, {
		warpGates: [
			new WarpGate('Gates', V2(160, 480), game),
			new WarpGate('Elon', V2(480, 160), game),
			new WarpGate('Josiah', V2(50, 160), game),
			new WarpGate('Turing', V2(480, 350), game)
		],
		planets: [
			new Planet('Rust', 43, V2(280, 220), game),
			new Planet('Watermelon', 33, V2(420, 380), game),
			new Planet("Johnny Cash", 50, V2(180, 120), game),
			new Planet("You're Mother", 40, V2(680, 220), game)
		],
		star: ZacStar
	})
	Zac.planets.forEach(planet => planet.setOrbit(ZacStar))
	Zac.activate = () => {
		ZacStar.collapse(500)
	}

	const TuringAsteroids = []
	for (let i = 0; i < 5; i++) {
		TuringAsteroids.push(new Asteroid(V2(0, 0), V2(((51 + 41 * i) % 71) * 10, ((41 + 41 * i) % 53) * 10), game))
	}
	const Turing = new SolarSystem("Turing", "Joziac", game, {
		asteroids: TuringAsteroids,
		asteroidLaunchers: [
			new AsteroidLauncher(game, V2(-80, 50), V2(300, 300)), 
			new AsteroidLauncher(game, V2(-10, 410), V2(200, 200), true, 5)
		],
		warpGates: [
			new WarpGate('Zac', V2(590, 190), game),
			new WarpGate('Josiah', V2(410, 410), game),
			new WarpGate('ECE105', V2(300, 160), game),
		],
		planets: [
			new Planet('Planet Joziac', 43, V2(180, 420), game),
			new Planet('Zig', 33, V2(520, 480), game),
		]
	})

	;[Elon, Zac, Josiah].forEach((galaxy) => {
		galaxy.warpGates.forEach((warpGate) => {
			if (Math.random() > 0.5) warpGate.fourthDimension = true
		})
	})

	return new Galaxy('Joziac', game, [ECE105, Torvalds, Gates, Elon, Josiah, Zac, Turing])
}