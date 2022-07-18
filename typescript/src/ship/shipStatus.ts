import Vector2 from '../helpers/Vector2'

interface ShipStatus {
	galaxyName: string
	solarSystemName: string
	position: Vector2
	radius: number
	linearVelocity: Vector2
	angularVelocity: number
	angle: number
	torpedoSpeed: number
	hasLanded: boolean
}

export type { ShipStatus }
