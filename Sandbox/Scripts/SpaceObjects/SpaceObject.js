
// using System.Collections.Generic;

export default class SpaceObject /* extends Node2D */ {
    // [Export] string description = "An interesting space object...";
    // [Export] List<SpaceMaterials> materials;
    // [Export] GravitySignature gravitySignature;

    // public GravitySignature GravitySignature { get { return gravitySignature; } }
    // public int MaterialSignature { get; private set; }

    // Called when the node enters the scene tree for the first time.
    _Ready(){
        CalculateMaterialSignature();
    }

    /**
     * @returns void
     */
    CalculateMaterialSignature() {
        MaterialSignature = 0;
        if(materials.Count > 0) {
            for (const material of materials){
                MaterialSignature += (0x1 << material);
            }
        }
    }
}
