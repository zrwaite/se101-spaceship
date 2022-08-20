import Vector2 from '../helpers/Vector2'

interface ShipStatus {
	radius: number
	angularVelocity: number
	angle: number
	torpedoSpeed: number
	positionX: number
	positionY: number
	linearVelocityX: number
	linearVelocityY: number
	thrusterPowerMain: number
	thrusterPowerBow: number
	thrusterPowerClockwise: number
	thrusterPowerCounterClockwise: number
}

export type { ShipStatus }
