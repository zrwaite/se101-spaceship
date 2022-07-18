import Vector2 from "./Vector2";

export default class Matrix2 {
    m: [[number, number], [number, number]];
    // constructs matrix based on 4 points
    constructor(x11:number, x12:number, x21:number, x22:number) {
        this.m = [[x11, x12],[x21, x22]];
    }

    // construct matrix based on 2 vectors
    // used for basis vector calculations
    static MakeBasisMatrix(v1:Vector2, v2:Vector2) {
        return new Matrix2(v1.x, v2.x, v1.y, v2.y);
    }

    static Rotate90CCW = new Matrix2(0, -1, 1, 0);

    // computes the inverse of a matrix
    inverse() {
        const determinant = 1/(this.m[0][0]*this.m[1][1]-this.m[0][1]*this.m[1][0])
        return new Matrix2(
            this.m[1][1]*determinant,
            this.m[0][1]*determinant*-1,
            this.m[1][0]*determinant*-1,
            this.m[0][0]*determinant,
        );
    }
}