import { isNotEmittedStatement } from "../../node_modules/typescript/lib/typescript"
import Galaxy from "./galaxies/galaxy"
import PlanetComposition from "./spaceObjects/planetComposition"

export const getScore = (
	survivablityChance: number,
	energyUsed: number,
	damageTaken: number,
	galaxy: Galaxy,
):number => {
	let score = (survivablityChance / getMaxSurvivablityChance(galaxy)) * 100
	console.log(energyUsed)
	let energyScorer = 0//Math.pow(energyUsed, 0.8)
	if (energyUsed < 500) {
		energyScorer = 0.00002 * Math.pow(energyUsed, 2)
	} else if (energyUsed < 10000) {
		energyScorer = 0.001 * energyUsed + 4.5
	} else if (energyUsed < 100000) {
		energyScorer = 0.000015 * energyUsed + 13
	} else if (energyUsed < 1000000) {
		energyScorer = 0.00001 * energyUsed + 27
	} else {
		energyScorer = 0.000001 * energyUsed + 36
	}
	console.log(energyScorer)
	let damageScorer = 5 * Math.log2(damageTaken)

	score *= ((100 - energyScorer - damageScorer) / 100)
	return Math.max(Math.round(score * 10) / 10, 0)
}

function makeList(items: string[]):string {
  if (items.length === 1) {
    return `<span>${items[0]}</span>`
  } else if (items.length === 2) {
    return `<span>${items[0]}</span> and <span>${items[1]}</span>`
  }
  let listString = `<span>${items[0]}</span>`
  for (let i = 1; i < items.length - 1; i++) {
    listString += `, <span>${items[i]}</span>`
  }
  listString += `, and <span>${items[items.length - 1]}</span>` // Don't dare to fight me about the oxford comma 👀
  return listString
}

export const generateSummary = (planet: PlanetComposition):string => {
	/*let positiveInfo = []
	let negativeSummary = []
	if (planet.water > 70) positiveInfo.push('is water-rich.')
	else if (planet.water < 30) negativeSummary.push('does not have much potable water.')
	if (planet.air > 70) positiveInfo.push('has an ideal atmosphere.')
	else if (planet.air < 30) negativeSummary.push('does not have a very breathable atmosphere.')
	if (planet.safety > 70) positiveInfo.push('is very safe.')
	else if (planet.safety < 30) negativeSummary.push('is very dangerous.')
	if (planet.land > 70) positiveInfo.push("has a lot of good land.")
	else if (planet.land < 30) positiveInfo.push("doesn't have a lot of good land.")
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
	return {positive, negative}*/
  let positiveInfo = []
  let negativeInfo = []
	if (planet.temperature > 60) negativeInfo.push('very hot')
	else if (planet.temperature < -30) negativeInfo.push('very cold')
	else if (planet.temperature < 40 && planet.temperature > 0) positiveInfo.push('a great temperature')
	if (planet.air > 70) positiveInfo.push('atmospherically safe')
	else if (planet.air < 30) negativeInfo.push('not breathable for humans')
  if (planet.water > 70) positiveInfo.push('water-rich')
	else if (planet.water < 30) negativeInfo.push('low on water')
	if (planet.safety > 70) positiveInfo.push('very safe')
	else if (planet.safety < 30) negativeInfo.push('very dangerous')
	if (planet.land > 70) positiveInfo.push("full of good land")
	else if (planet.land < 30) positiveInfo.push("barren")
	if (planet.metal > 70) positiveInfo.push('abundant with metals')
	else if (planet.metal < 30) negativeInfo.push('void of resources')

  if (positiveInfo.length === 0 && negativeInfo.length > 0) {
    return `It's a darn bad planet. Seriously, it has no good things. It's just ${makeList(negativeInfo)}.`
  } else if (negativeInfo.length === 0) {
    return `It's quite a fantastic planet! No bad things. It's simply ${makeList(positiveInfo)}.`
  } else if (positiveInfo.length > 0) {
    return `It's ${makeList(positiveInfo)}. Unfortunately, it's also ${makeList(negativeInfo)}.`
  }
  return `It's a very plain planet. So mediocre, in fact, that absolutely <em>none</em> of its features are worth noting.`
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