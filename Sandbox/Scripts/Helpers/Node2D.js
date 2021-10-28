import { Vector2 } from "./Vector2.js";

export default class Node2D {

    constructor() {
        this.globalPosition = new Vector2(0, 0);
        this.globalRotation = 0;
        this.globalScale = 1;
    }

    // Need to update position of children
    get GlobalPosition() { return this.globalPosition; }
    set GlobalPosition(value) { this.globalPosition = value; }

    // Need to update rotation of children
    get GlobalRotation() { return this.globalRotation; }
    set GlobalRotation(value) { this.globalRotation = value % (2 * Math.PI); }

    // Need to update rotation of children
    get GlobalScale() { return this.globalScale; }
    set GlobalScale(value) { this.globalScale = value; }

    /**
     * 
     * @param {Vector2} vectorTranslation 
     */
    globalTranslate(vectorTranslation) {
        this.globalPosition.add(vectorTranslation);
    }

    /**
     * 
     * @param {float} rotate Amount of rotation to modify current globalRotate by (Radians)
     */
    globalRotate(rotate) {
        this.globalRotation = (this.globalRotation + rotate) % (2 * Math.PI);
    }
}