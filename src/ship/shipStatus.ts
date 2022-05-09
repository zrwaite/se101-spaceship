import Vector2 from "../helpers/Vector2";

interface ShipStatus {
	solarSystemName: string,
	position: Vector2,
	radius: number,
	linearVelocity: Vector2,
	angularVelocity: number,
	direction: Vector2,
	torpedoSpeed: number,
	hasLanded: boolean
}

export type {ShipStatus}