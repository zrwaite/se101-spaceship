import Vector2 from '../helpers/Vector2'
import PlanetComposition from '../spaceObjects/planetComposition'

export default class EMSReading {
	angle: number
	distance: number
	velocity: Vector2
	radius: number
	closeRange?: {
		scanSignature?: object
	}
	constructor(angle: number, velocity: Vector2, radius: number, distance: number, scanSignature: PlanetComposition | undefined = undefined) {
		this.angle = angle // The angle of the reading (relative to global X axis) //number
		this.velocity = velocity // The velocity of the detected object relative to current solar system coordinate frame //Vector
		this.distance = distance
		this.radius = radius // The collision radius of the detected object //number
		if (distance < 100) {
			this.closeRange = {
				scanSignature: scanSignature, // A more detail description of the object's material composition //object
			}
		}
	}
}
