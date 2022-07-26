import Game from './game.js'
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
	constructor(galaxyName: GalaxyName, game: Game) {
		this.name = galaxyName
		this.game = game
		switch (galaxyName) {
			case 'Noob':
				this.solarSystemNames.push('Tutorial')
				break
			case 'Compiles':
				this.solarSystemNames.push('Goose', 'Waterloo', 'StackOverflow')
				break
			case 'Cracked':
				this.solarSystemNames.push("Hargun", 'Olivia', 'Ali', 'Derek')
				break
			case 'Joziac':
				this.solarSystemNames.push('ECE105', 'Torvalds', 'Gates', 'Elon', 'Josiah', 'Zac', 'Turing')
				break
		}
		// Create solar systems with associated galaxy
		for (const name of this.solarSystemNames) {
			this.solarSystems.push(new SolarSystem(name, this.name, this.game))
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
