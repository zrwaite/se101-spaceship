import Vector2 from '../helpers/Vector2.js'
import Asteroid from '../spaceObjects/asteroid.js'
import WarpGate from '../spaceObjects/warpGate.js'
import Planet from '../spaceObjects/planet.js'
import AsteroidLauncher from '../spaceObjects/asteroidLauncher.js'
import Game from '../game.js'

interface MapData {
	galaxy: string
	solarSystem: string
	planets: string[]
	warpGates: string[]
}

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
] as const

export type SolarSystemName = typeof SolarSystemNames[number]
export default class SolarSystem {
	shipStartPosition = new Vector2(300, 300)
	warpGates: WarpGate[]
	planets: Planet[]
	asteroids: Asteroid[]
	asteroidLaunchers: AsteroidLauncher[]
	game: Game
	name: SolarSystemName
	galaxyName: string
	constructor(solarSystemName: SolarSystemName, galaxyName: string, game: Game, objects: {
		asteroids?: Asteroid[],
		warpGates?: WarpGate[],
		planets?: Planet[],
		asteroidLaunchers?: AsteroidLauncher[],
	}) {
		this.game = game
		this.galaxyName = galaxyName
		this.name = solarSystemName
		this.asteroids = objects.asteroids ?? []
		this.warpGates = objects.warpGates ?? []
		this.planets = objects.planets ?? []
		this.asteroidLaunchers = objects.asteroidLaunchers ?? []
	}
	getMapData(): MapData {
		return {
			galaxy: this.galaxyName,
			solarSystem: this.name,
			planets: this.planets.map((planet) => planet.name),
			warpGates: this.warpGates.map((warpGate) => warpGate.destinationSolarSystem),
		}
	}
}

export type { MapData }
