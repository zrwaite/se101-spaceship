
// using System.Collections.Generic;

export default class SpaceObject /* extends Node2D */ {

    constructor() {
        this.description = "An interesting space object...";
        this.materials = null;
        this.gravitySignature = null;
        this.materialSignature = null;
    }

    get GravitySignature() { return this.gravitySignature; }
    get MaterialSignature() { return this.materialSignature; }
    set MaterialSignature(value) { return this.materialSignature; }

    // Called when the node enters the scene tree for the first time.
    _Ready(){
        calculateMaterialSignature();
    }

    /**
     * @returns void
     */
    calculateMaterialSignature() {
        MaterialSignature = 0;
        if(materials.Count > 0) {
            for (const material of materials){
                MaterialSignature += (0x1 << material);
            }
        }
    }
}
