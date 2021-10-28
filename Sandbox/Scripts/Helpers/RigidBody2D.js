import { Node2D } from './Node2D.js';
import { Vector2 } from './Vector2.js';

export default class RigidBody2D extends Node2D {
    constructor() {
        super();

        this.appliedForce = new Vector2(0, 0);
        this.appliedTorque = 0;
        this.angularVelocity = 0;
        this.linearVelocity = new Vector2(0, 0);
        this.mass = 1;
        this.onBodyEntered = () => {};
        this.angularDamp = 0;
        this.linearDamp = 0;
        this.friction = 0;
    }

    /**
     * 
     * @param {Vector2} offset 
     * @param {Vector2} force 
     */
    addForce(offset, force) {

    }

    performPhysics() {

    }

    physicsProcess() {

    }

    _integrate_forces() {
        
    }
}
