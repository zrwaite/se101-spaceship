import Game from '../game.js'
import { BuildCompiles } from './compiles.js'
import { BuildCracked } from './cracked.js'
import { BuildJoziac } from './joziac.js'
import { BuildNoob } from './noob.js'
import SolarSystem, { SolarSystemName } from './solarSystem.js'

//Parent class for galaxies, use data from galaxy jsons and GalaxyMaps scripts
//The constructor is going to build the galaxies
//Think of this as creating all the links between solar system levels
export type GalaxyName = 'Noob' | 'Compiles' | 'Cracked' | 'Joziac'
export default class Galaxy {
	/* constructor params */
	name
	game
	/* Default Attributes */
	solarSystems: SolarSystem[] = []
	/* Other attributes */
	startingSolarSystem: SolarSystem
	startingSolarSystemName
	solarSystemNames: SolarSystemName[] = []
	constructor(galaxyName: GalaxyName, game: Game, solarSystems: SolarSystem[]) {
		this.name = galaxyName
		this.game = game
		this.solarSystems = solarSystems

		// Create solar systems with associated galaxy
		for (const solarSystem of this.solarSystems) {
			this.solarSystemNames.push(solarSystem.name)
		}

		// Set starting solar system to the first system in the list
		this.startingSolarSystem = this.solarSystems[0]
		this.startingSolarSystemName = this.solarSystemNames[0]
	}
	getSolarSystem(solarSystemName: string) {
		let returnSolarSystem: SolarSystem | false = false
		this.solarSystems.forEach((solarSystem) => {
			if (solarSystem.name === solarSystemName) {
				returnSolarSystem = solarSystem
			}
		})
		return returnSolarSystem
	}
}

export const BuildGalaxy = (galaxyName: GalaxyName, game: Game): Galaxy => {
	switch (galaxyName) {
		case 'Noob':  return BuildNoob(game)
		case 'Compiles': return BuildCompiles(game)
		case 'Cracked': return BuildCracked(game)
		case 'Joziac': return BuildJoziac(game)
	}
}
