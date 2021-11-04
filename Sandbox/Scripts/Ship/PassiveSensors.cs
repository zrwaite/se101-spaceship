//Based on PassiveSensors.cs

public class PassiveSensors : Area2D, IPassiveSensors
{
    public float GConstant { get; private set; } = 1f;

    public List<PassiveSensorReading> PassiveReadings { get; private set; } = new List<PassiveSensorReading>();

    public float InterferenceScale { get; private set; } = 0f;
    RandomNumberGenerator random = new RandomNumberGenerator();

    Font debugFont;

    public override void _Ready()
    {
        debugFont = GD.Load<Font>("res://Sandbox/Fonts/DebugFont.tres");
    }

    /// <summary>
    /// Long range sensor detection of WarpGates and LargeBodies
    /// </summary>
    public void GeneratePassiveSensorReadings()
    {
        PassiveReadings.Clear();

        var overlaps = GetOverlappingAreas();
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
