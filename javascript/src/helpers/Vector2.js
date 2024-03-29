export const V2 = (x, y) => new Vector2(x, y);
export default class Vector2 {
    /*
    I rewrote the whole library to be a class so that
    we can create our own static methods and functions
    */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    set(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    equals(vector) {
        return this.x === vector.x && this.y === vector.y;
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
        let ratio = magnitude / this.magnitude();
        return this.scale(ratio);
    }
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
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
        return this.x * this.x + this.y * this.y;
    }
    distance(vector) {
        return Math.sqrt(this.distanceSqr(vector));
    }
    distanceSqr(vector) {
        let deltaX = this.x - vector.x;
        let deltaY = this.y - vector.y;
        return deltaX * deltaX + deltaY * deltaY;
    }
    normalize() {
        let mag = this.magnitude();
        let vector = this.clone();
        if (Math.abs(mag) < 1e-9) {
            vector.x = 0;
            vector.y = 0;
        }
        else {
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
    angleToPoint(point) {
        return point.subtract(this).angle();
    }
    rotate(alpha) {
        let cos = Math.cos(alpha);
        let sin = Math.sin(alpha);
        let vector = new Vector2(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
        return vector;
    }
    rotateTo(angle) {
        let rotateBy = angle - this.angle();
        return this.rotate(rotateBy);
    }
    toPrecisionString(precision) {
        let vector = this.clone();
        let x = vector.x.toFixed(precision);
        let y = vector.y.toFixed(precision);
        return { x: x, y: y };
    }
    toString() {
        let vector = this.toPrecisionString(1);
        return '[' + vector.x + '; ' + vector.y + ']';
    }
    // M is a Matrix2, returns Mv
    matrixMultiply(M) {
        return new Vector2(M.m[0][0] * this.x + M.m[0][1] * this.y, M.m[1][0] * this.x + M.m[1][1] * this.y);
    }
}
Vector2.zero = new Vector2(0, 0);
Vector2.right = new Vector2(1, 0);
Vector2.one = new Vector2(1, 1);
