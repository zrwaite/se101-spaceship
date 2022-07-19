import Vector2 from '../helpers/Vector2'

export default class EMSReading {
	angle: number
	amplitude: number
	velocity: Vector2
	closeRange?: {
		radius: number
		distance: number
		scanSignature?: object
	}
	constructor(angle: number, amplitude: number, velocity: Vector2, radius: number, distance: number, scanSignature: object | undefined = undefined) {
		this.angle = angle // The angle of the reading (relative to global X axis) //number
		this.amplitude = amplitude // The strength of the reading
		this.velocity = velocity // The velocity of the detected object relative to current solar system coordinate frame //Vector
		console.log(distance)
		if (distance < 100) {
			this.closeRange = {
				radius: radius, // The collision radius of the detected object //number
				scanSignature: scanSignature, // A more detail description of the object's material composition //object
				distance: distance,
			}
		}
	}
}
