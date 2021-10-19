import SpaceMaterials from "./../Ship/SpaceMaterials";

export default class SpaceMaterialSignature {
    constructor() {
        // External
        this.unknown = null;        // bool
        this.common = null;         // bool
        this.metal = null;          // bool
        this.water = null;          // bool
        this.fisable = null;        // bool
        this.antimatter = null;     // bool

        this.materialSignature;     // int
    }

    // PROPERTIES
	// getters and settings for materialSignature property
	get MaterialSignature() { return this.materialSignature; }
	set MaterialSignature(value) { this.materialSignature = value; }

    _Ready() {
        if(unknown){
            MaterialSignature += (0x1 << (int)SpaceMaterials.Unknown);
        }

        if(common){
            MaterialSignature += (0x1 << (int)SpaceMaterials.Common);
        }

        if(metal){
            MaterialSignature += (0x1 << (int)SpaceMaterials.Metal);
        }

        if(water){
            MaterialSignature += (0x1 << (int)SpaceMaterials.Water);
        }

        if(fisable){
            MaterialSignature += (0x1 << (int)SpaceMaterials.Fisable);
        }

        if(antimatter){
            MaterialSignature += (0x1 << (int)SpaceMaterials.Antimatter);
        }
    }
}