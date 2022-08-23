import { GalaxyName } from "../galaxies/galaxy"
import { SolarSystemName } from "../galaxies/solarSystem"
import { PlanetName } from "../spaceObjects/planet"
import ColonyShip from "./colonyShip"

interface SolarSystemData {
	name: SolarSystemName
	warpGates: SolarSystemName[]
	planets: PlanetName[]
}
interface GalaxyData {
	name: GalaxyName
	solarSystems: SolarSystemData[]
}

export interface MapData {
	solarSystemName: SolarSystemName
	galaxy: GalaxyData
}


export const getMapData = (ship: ColonyShip): MapData => {
	ship.energyUsed += 10
	const galaxy = ship.game.galaxy
	if (galaxy === null) throw Error("No galaxy loaded")
	return {
		solarSystemName: ship.solarSystem.name,
		galaxy: {
			name: galaxy.name,
			solarSystems: galaxy.solarSystems.map((solarSystem) => ({
				name: solarSystem.name,
				warpGates: solarSystem.warpGates.map((warpGate) => warpGate.destinationSolarSystem),
				planets: solarSystem.planets.map((planet) => planet.name)
			}))
		}
	}
}