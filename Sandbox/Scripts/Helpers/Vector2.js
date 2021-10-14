export default function Vector2(x, y) {
	this.x = (x === undefined) ? 0 : x;
	this.y = (y === undefined) ? 0 : y;
}

Vector2.prototype = {
	set: function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	},

	clone: function() {
		return new Vector2(this.x, this.y)
	},

	add: function(vector) {
		return new Vector2(this.x + vector.x, this.y + vector.y);
	},

	subtract: function(vector) {
		return new Vector2(this.x - vector.x, this.y - vector.y);
	},

	scale: function(scalar) {
		return new Vector2(this.x * scalar, this.y * scalar);
	},

	dot: function(vector) {
		return (this.x * vector.x + this.y + vector.y);
	},

	moveTowards: function(vector, t) {
		// Linearly interpolates between vectors A and B by t.
		// t = 0 returns A, t = 1 returns B
		t = Math.min(t, 1); // still allow negative t
		var diff = vector.subtract(this);
		return this.add(diff.scale(t));
	},

	magnitude: function() {
		return Math.sqrt(this.magnitudeSqr());
	},

	magnitudeSqr: function() {
		return (this.x * this.x + this.y * this.y);
	},

	distance: function (vector) {
		return Math.sqrt(this.distanceSqr(vector));
	},

	distanceSqr: function (vector) {
		var deltaX = this.x - vector.x;
		var deltaY = this.y - vector.y;
		return (deltaX * deltaX + deltaY * deltaY);
	},

	normalize: function() {
		var mag = this.magnitude();
		var vector = this.clone();
		if(Math.abs(mag) < 1e-9) {
			vector.x = 0;
			vector.y = 0;
		} else {
			vector.x /= mag;
			vector.y /= mag;
		}
		return vector;
	},

	angle: function() {
		return Math.atan2(this.y, this.x);
	},

	rotate: function(alpha) {
		var cos = Math.cos(alpha);
		var sin = Math.sin(alpha);
		var vector = new Vector2();
		vector.x = this.x * cos - this.y * sin;
		vector.y = this.x * sin + this.y * cos;
		return vector;
	},

	toPrecision: function(precision) {
		var vector = this.clone();
		vector.x = vector.x.toFixed(precision);
		vector.y = vector.y.toFixed(precision);
		return vector;
	},

	toString: function () {
		var vector = this.toPrecision(1);
		return ("[" + vector.x + "; " + vector.y + "]");
	}
};