export const withinPiRange = (angle: number) => {
	if (angle > Math.PI) angle = -2 * Math.PI + angle
	if (angle < -Math.PI) angle = 2 * Math.PI - angle
	return angle
}
