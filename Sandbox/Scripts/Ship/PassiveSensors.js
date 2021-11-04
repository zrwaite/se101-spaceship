//Based on PassiveSensors.cs

import Vector2 from "../Helpers/Vector2";

export default class PassiveSensors extends IPassiveSensors{
    constructor(...args){
        super(...args);
        this.GConstant = 1;
        this.PassiveReadings = []; //PassiveSensorReading
        this.InterferenceScale = 0; //Don't know what this does 
        this.debugFont; //font file... this might have to be in css
    }
    _Ready(){
        //this.debugFont = "res://Sandbox/Fonts/DebugFont.tres";
    }

    GeneratePassiveSensorReadings(){ // Long range sensor detection of WarpGates and LargeBodies
        this.PassiveReadings = [];
        let overlaps = GetOverlappingAreas(); //I believe this function is built into godot, we will need to remake or change
        for (let i = 0; i<=overlaps.length; i++){
            let area = overlaps[i]
            let ID = area.GetInstanceId(); //this function is from godot i think, will need to be remade/change
            switch (area){
                case warpGate:
                    randomInsideCircle = new Vector2(Math.random()*2-1, Math.random()*2-1).magnitude;
                    
            }
        }

        foreach (Area2D area in overlaps)
        {
            ulong ID = area.GetInstanceId();

            switch (area)
            {
                case WarpGate warpGate:
                    {
                        Vector2 randomInsideCircle = new Vector2(random.RandfRange(-1f, 1f), random.RandfRange(-1f, 1f)).Normalized();
                        Vector2 noiseOffset = randomInsideCircle * InterferenceScale;
                        Vector2 positionDiff = (warpGate.GlobalPosition + noiseOffset) - GlobalPosition;
                        //float angle = GetAngleTo(warpGate.GlobalPosition + noiseOffset);
                        float angle = Vector2.Right.AngleTo(positionDiff);


                        float waveAmplitude = GConstant / positionDiff.Length();

                        PassiveReadings.Add(new PassiveSensorReading(ID, angle, /*waveAmplitude,*/ GravitySignature.WarpGate/*, warpGate.DestinationSolarSystemName*/));
                    }
                    break;

                case LargeBody largeBody:
                    {
                        Vector2 randomInsideCircle = new Vector2(random.RandfRange(-1f, 1f), random.RandfRange(-1f, 1f)).Normalized();
                        Vector2 noiseOffset = randomInsideCircle * InterferenceScale;
                        Vector2 noisyVectorToBody = (largeBody.GlobalPosition + noiseOffset) - GlobalPosition;

                        float angle = Vector2.Right.AngleTo(noisyVectorToBody);
                        float waveAmplitude = GConstant / noisyVectorToBody.Length();
                        
                        GravitySignature signature = largeBody.GravitySignature;

                        PassiveReadings.Add(new PassiveSensorReading(ID, angle, /*waveAmplitude,*/ signature));
                    }
                    break;
            }
        }
    }

    public override void _Process(float delta)
    {
        Update();
    }

    public override void _Draw()
    {
        // DrawSetTransformMatrix(GetGlobalTransform().Inverse());

        // foreach (var reading in GWIReadings)
        // {
        //     DrawLine(GlobalPosition, GlobalPosition + (Vector2.Right * 1f / reading.Amplitude).Rotated(reading.Angle), Colors.Yellow);
        // }

        // DrawSetTransformMatrix(GetGlobalTransform());
    }
}
