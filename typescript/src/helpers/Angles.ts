export const withinPiRange = (angle: number) => {
	if (angle > Math.PI) angle += - 2 * Math.PI
	if (angle < -Math.PI) angle += 2 * Math.PI
	return angle
}

export const angleDiff = (a:number, b: number) => {
	a = withinPiRange(a)
	b = withinPiRange(b)
	if (a < b) return withinPiRange(2 * Math.PI - (b - a))
	return withinPiRange(a - b)
}