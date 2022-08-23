import { isNotEmittedStatement } from "../../node_modules/typescript/lib/typescript"
import Galaxy from "./galaxies/galaxy"
import PlanetComposition from "./spaceObjects/planetComposition"

export const getScore = (
	survivablityChance: number,
	energyUsed: number,
	damageTaken: number,
	galaxy: Galaxy,
):number => {
	const score = (survivablityChance / getMaxSurvivablityChance(galaxy)) * 100 - Math.pow(energyUsed, 0.3) - 4 * Math.log10(damageTaken)
	return Math.round(score * 10) / 10
}

export const generateSummary = (planet: PlanetComposition):{positive: string, negative: string} => {
	let positiveInfo = []
	let negativeSummary = []
	if (planet.water > 70) positiveInfo.push('is water-rich.')
	else if (planet.water < 30) negativeSummary.push('does not have much potable water.')
	if (planet.air > 70) positiveInfo.push('has an ideal atmosphere.')
	else if (planet.air < 30) negativeSummary.push('does not have a very breathable atmosphere.')
	if (planet.safety > 70) positiveInfo.push('is very safe.')
	else if (planet.safety < 30) negativeSummary.push('is very dangerous.')
	if (planet.metal > 70) positiveInfo.push('has a good amount of resources')
	else if (planet.metal < 30) negativeSummary.push('has a limited amount of resources')
	if (planet.temperature > 60) negativeSummary.push('is very hot.')
	else if (planet.temperature < -30) negativeSummary.push('is very cold. ')
	else if (planet.temperature < 40 && planet.temperature > 0) positiveInfo.push('is the ideal temperature.')
	let positive = ''
	if (positiveInfo.length > 0) {
		positive += 'Fortunately: <br/>'
		positive += `<ul>${positiveInfo.map((value, i) => {
			return `<li>${i?'It ': 'Your new planet '}${value}</li>`
		})}</ul>`
		positive += '<br/>'
	}
	let negative = ''
	if (negativeSummary.length > 0) {
		negative += 'Unfortunately: <br/>'
		negative += `<ul>${negativeSummary.map((value, i) => {
			return `<li>${i?'It ': 'Your new planet '}${value}</li>`
		})}</ul>`
	}
	return {positive, negative}
}

export const getMaxSurvivablityChance = (galaxy: Galaxy):number => {
	let maxSurvivablityChance = 0
	galaxy.solarSystems.forEach(solarSystem => {
		solarSystem.planets.forEach(planet => {
			if (planet.composition.survivabilityChance > maxSurvivablityChance) {
				maxSurvivablityChance = planet.composition.survivabilityChance
			}
		})
	})
	return maxSurvivablityChance
}