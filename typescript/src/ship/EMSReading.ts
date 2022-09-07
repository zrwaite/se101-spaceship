import Vector2 from '../helpers/Vector2'
import PlanetComposition from '../spaceObjects/planetComposition'

export type CloseRangeData = {
	type: 'Planet'
	planetComposition: PlanetComposition
} | {
	type: 'Meteor' | 'Asteroid' | 'WarpGate' | 'Other'
	PlanetComposition?: undefined
}
export class EMSReading {
	angle: number
	distance: number
	velocity: Vector2
	radius: number
	closeRange?: CloseRangeData
	constructor(angle: number, velocity: Vector2, radius: number, distance: number, closeRangeData: CloseRangeData | undefined = undefined) {
		this.angle = angle // The angle of the reading (relative to global X axis) //number
		this.velocity = velocity // The velocity of the detected object relative to current solar system coordinate frame //Vector
		this.distance = distance
		this.radius = radius // The collision radius of the detected object //number
		if (distance < 100) {
			this.closeRange = closeRangeData
		}
	}
}
