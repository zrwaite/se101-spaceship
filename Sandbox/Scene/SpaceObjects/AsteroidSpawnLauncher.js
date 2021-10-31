export class AsteroidSpawnLauncher /* extends Node2D */ {
    constructor() {
        this.maxSpawnCount = 6; //int
        this.spawnPeriod = 3; //float
        this.launchSpeedMin = 100; // float
        this.launchSpeedMax = 300; //float
        this.asteroidPackedScene = null;//PackedScene
        this.randomizer = new RandomNumberGenerator();//RandomNumberGenerator
        this.spawn = new List<Asteroid>(); //List<Asteroid>
    }

    
    // Called when the node enters the scene tree for the first time.
    _Ready() {
        this.asteroidPackedScene = GD.Load<PackedScene>("res://Sandbox/Scenes/SpaceObjects/Asteroid.tscn"); //needs to be updated to json

        this.randomizer.Randomize();

        CallDeferred(nameof(Tick));
    }

    OnTimerTimeout()
    {
        CallDeferred(nameof(Tick));
    }

    Tick()
    {
        CleanList();
        if (this.spawn.Count < this.maxSpawnCount)
        {
            SpawnAsteroid();
        }
    }

    CleanList()
    {
        for (let i = this.spawn.Count - 1; i >= 0; i--)
        {
            if (this.spawn[i] == null)
            {
                this.spawn.RemoveAt(i);
            }
        }
    }

    SpawnAsteroid()
    {
        var newAsteroid = this.asteroidPackedScene.Instance() /* as Asteroid */;

        newAsteroid.GlobalPosition = GlobalPosition;
        
        randomSpeed = this.randomizer.RandfRange(this.launchSpeedMin, this.launchSpeedMax); //float
        newAsteroid.LinearVelocity = Vector2.Right.Rotated(GlobalRotation) * randomSpeed;

        GetParent().AddChild(newAsteroid);
        this.spawn.Add(newAsteroid);
    }
}
