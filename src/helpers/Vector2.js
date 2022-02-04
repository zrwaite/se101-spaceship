export default class Vector2 { 
	/*
	I rewrote the whole library to be a class so that 
	we can create our own static methods and functions
	*/
	constructor(x, y){
		this.x = (x === undefined) ? 0 : x;
		this.y = (y === undefined) ? 0 : y;
	}

	static zero = new Vector2(0,0);
	static right = new Vector2(1,0);
	static one = new Vector2(1,1);

	set(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}
	clone() {
		return new Vector2(this.x, this.y)
	}
	
	add(vector) {
		return new Vector2(this.x + vector.x, this.y + vector.y);
	}
	
	subtract(vector) {
		return new Vector2(this.x - vector.x, this.y - vector.y);
	}
	
	scale(scalar) {
		return new Vector2(this.x * scalar, this.y * scalar);
	}
	scaleTo(magnitude) {
		let ratio = magnitude/this.magnitude();
		return this.scale(ratio);
	}
	
	dot(vector) {
		return (this.x * vector.x + this.y + vector.y);
	}
	
	moveTowards(vector, t) {
		// Linearly interpolates between vectors A and B by t.
		// t = 0 returns A, t = 1 returns B
		t = Math.min(t, 1); // still allow negative t
		let diff = vector.subtract(this);
		return this.add(diff.scale(t));
	}
	
	magnitude() {
		return Math.sqrt(this.magnitudeSqr());
	}
	
	magnitudeSqr() {
		return (this.x * this.x + this.y * this.y);
	}
	
	distance (vector) {
		return Math.sqrt(this.distanceSqr(vector));
	}
	
	distanceSqr (vector) {
		let deltaX = this.x - vector.x;
		let deltaY = this.y - vector.y;
		return (deltaX * deltaX + deltaY * deltaY);
	}
	
	normalize() {
		let mag = this.magnitude();
		let vector = this.clone();
		if(Math.abs(mag) < 1e-9) {
			vector.x = 0;
			vector.y = 0;
		} else {
			vector.x /= mag;
			vector.y /= mag;
		}
		return vector;
	}
	
	angle() {
		return Math.atan2(this.y, this.x);
	}

	angleTo(vector) {
		return vector.angle() - this.angle();
	}
	
	rotate(alpha) {
		let cos = Math.cos(alpha);
		let sin = Math.sin(alpha);
		let vector = new Vector2();
		vector.x = this.x * cos - this.y * sin;
		vector.y = this.x * sin + this.y * cos;
		return vector;
	}

	rotateTo(angle) {
		let rotateBy = angle-this.angle();
		return this.rotate(rotateBy);
	}
	
	toPrecision(precision) {
		let vector = this.clone();
		vector.x = vector.x.toFixed(precision);
		vector.y = vector.y.toFixed(precision);
		return vector;
	}
	
	toString () {
		let vector = this.toPrecision(1);
		return ("[" + vector.x + "; " + vector.y + "]");
	}

	// M is a Matrix2, returns Mv
	matrixMultiply(M) {
		return new Vector2(M.m[0][0]*this.x + M.m[0][1]*this.y, M.m[1][0]*this.x + M.m[1][1]*this.y);
	}
}