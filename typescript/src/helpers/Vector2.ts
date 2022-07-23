import Matrix2 from './Matrix2'
export default class Vector2 {
	x: number
	y: number
	/*
	I rewrote the whole library to be a class so that 
	we can create our own static methods and functions
	*/
	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}

	static zero = new Vector2(0, 0)
	static right = new Vector2(1, 0)
	static one = new Vector2(1, 1)

	set(x: number = 0, y: number = 0) {
		this.x = x
		this.y = y
	}
	clone() {
		return new Vector2(this.x, this.y)
	}
	equals(vector: Vector2) {
		return this.x === vector.x && this.y === vector.y
	}

	add(vector: Vector2) {
		return new Vector2(this.x + vector.x, this.y + vector.y)
	}

	subtract(vector: Vector2) {
		return new Vector2(this.x - vector.x, this.y - vector.y)
	}

	scale(scalar: number) {
		return new Vector2(this.x * scalar, this.y * scalar)
	}
	scaleTo(magnitude: number) {
		let ratio = magnitude / this.magnitude()
		return this.scale(ratio)
	}

	dot(vector: Vector2) {
		return this.x * vector.x + this.y + vector.y
	}

	moveTowards(vector: Vector2, t: number) {
		// Linearly interpolates between vectors A and B by t.
		// t = 0 returns A, t = 1 returns B
		t = Math.min(t, 1) // still allow negative t
		let diff = vector.subtract(this)
		return this.add(diff.scale(t))
	}

	magnitude() {
		return Math.sqrt(this.magnitudeSqr())
	}

	magnitudeSqr() {
		return this.x * this.x + this.y * this.y
	}

	distance(vector: Vector2) {
		return Math.sqrt(this.distanceSqr(vector))
	}

	distanceSqr(vector: Vector2) {
		let deltaX = this.x - vector.x
		let deltaY = this.y - vector.y
		return deltaX * deltaX + deltaY * deltaY
	}

	normalize() {
		let mag = this.magnitude()
		let vector = this.clone()
		if (Math.abs(mag) < 1e-9) {
			vector.x = 0
			vector.y = 0
		} else {
			vector.x /= mag
			vector.y /= mag
		}
		return vector
	}

	angle() {
		return Math.atan2(this.y, this.x)
	}
	angleTo(vector: Vector2) {
		return vector.angle() - this.angle()
	}

	angleToPoint(point: Vector2) {
		return this.subtract(point).angle()
	}

	rotate(alpha: number) {
		let cos = Math.cos(alpha)
		let sin = Math.sin(alpha)
		let vector = new Vector2(this.x * cos - this.y * sin, this.x * sin + this.y * cos)
		return vector
	}

	rotateTo(angle: number) {
		let rotateBy = angle - this.angle()
		return this.rotate(rotateBy)
	}

	toPrecisionString(precision: number) {
		let vector = this.clone()
		let x = vector.x.toFixed(precision)
		let y = vector.y.toFixed(precision)
		return { x: x, y: y }
	}

	toString() {
		let vector = this.toPrecisionString(1)
		return '[' + vector.x + '; ' + vector.y + ']'
	}

	// M is a Matrix2, returns Mv
	matrixMultiply(M: Matrix2) {
		return new Vector2(M.m[0][0] * this.x + M.m[0][1] * this.y, M.m[1][0] * this.x + M.m[1][1] * this.y)
	}
}
