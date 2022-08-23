interface ShipStatus {
	radius: number
	angularVelocity: number
	angle: number
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
