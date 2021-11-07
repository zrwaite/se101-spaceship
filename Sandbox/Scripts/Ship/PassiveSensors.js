//Based on PassiveSensors.cs

import Vector2 from "../Helpers/Vector2";

export default class PassiveSensors{
    constructor(...args){
        super(...args);
        this.gConstant = 1;
        this.passiveReadings = []; //PassiveSensorReading
        this.interferenceScale = 0; //Don't know what this does 
        this.debugFont; //font file... this might have to be in css
    }
    _Ready(){
        //this.debugFont = "res://Sandbox/Fonts/DebugFont.tres";
    }

    GeneratePassiveSensorReadings(){ // Long range sensor detection of WarpGates and LargeBodies
        this.passiveReadings = [];
        let overlaps = GetOverlappingAreas(); //I believe this function is built into godot, we will need to remake or change
        overlaps.forEach((area)=>{
            let ID = area.GetInstanceId(); //this function is from godot i think, will need to be remade/change
            switch (area){
                case warpGate:
                    let randomInsideCircle = new Vector2(Math.random()*2-1, Math.random()*2-1).magnitude;
                    let noiseOffset = randomInsideCircle * this.InterferenceScale;
                    let positionDiff = (warpGate.GlobalPosition.add(noiseOffset)).subtract(GlobalPosition);
                    let angle = Vector2.right.angleTo(positionDiff);
                    this.passiveReadings.push(new passiveSensorReading(ID, angle, gravitySignature.warpGate));
                    break;
                case largeBody:
                    let randomInsideCircle = new Vector2(Math.random()*2-1, Math.random()*2-1).magnitude;
                    let noiseOffset = randomInsideCircle * this.InterferenceScale;
                    let positionDiff = (largeBody.GlobalPosition.add(noiseOffset)).subtract(GlobalPosition);
                    let angle = Vector2.right.angleTo(positionDiff);
                    let signature = largeBody.GravitySignature;
                    this.passiveReadings.push(new passiveSensorReading(ID, angle, signature));
                    break;
            }
        });
    }
    _Process (delta){
        Update();
    }
    _Draw(){

    }
}
