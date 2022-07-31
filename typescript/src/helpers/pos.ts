import Vector2 from "./Vector2";

const MapX = 720
const MapY = 540

export const outOfMap = (pos: Vector2): boolean => {
	return (pos.x < 0 || pos.x > MapX || pos.y < 0 || pos.y > MapY)
}

export const keepInMap = (pos: Vector2): boolean => {
	let inMap = true
	if (pos.y > MapY) {
		//y pos bounds
		pos.y = MapY
		inMap = false
	} else if (pos.y < 0) {
		pos.y = 0
		inMap = false
	}
	if (pos.x > MapX) {
		// x pos bounds
		pos.x = MapX
		inMap = false
	} else if (pos.x < 0) {
		pos.x = 0
		inMap = false
	}
	return !inMap
}