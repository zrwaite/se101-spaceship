export class TurbulenceField /*extends Area2D*/ {
    constructor() {
        this.particleFieldNodePath;                                 //NodePath

        this.particles = null;                                      //Particles2D
        this.particlesMaterial = null;                              //ParticlesMaterial

        this.randomNumberGenerator = new RandomNumberGenerator();   //RandomNumberGenerator
        this.noise = null;                                          //OpenSimplexNoise
        this.samplePosition = new Vector2();                        //Vector2
        this.sampleVelocity = new Vector2();                        //Vector2
    }

    // Called when the node enters the scene tree for the first time.
    _Ready() {
        this.particles = GetNode<Particles2D>("Particles2D");
        this.particlesMaterial = particles.ProcessMaterial  /*as ParticlesMaterial*/;

        this.noise = new OpenSimplexNoise();
        this.noise.Octaves = 4;
        this.noise.Period = 20;
        this.noise.Persistence = 0.8;
    }

    _PhysicsProcess(delta) {
        sampleVelocity.x += this.randomNumberGenerator.RandfRange(-1, 1);
        sampleVelocity.y += this.randomNumberGenerator.RandfRange(-1, 1);
        samplePosition += sampleVelocity * delta;
        
        var xNoise = this.noise.GetNoise2d(samplePosition.x, samplePosition.y);     //float
        var yNoise = this.noise.GetNoise2d(samplePosition.y, samplePosition.x);     //float

        this.particlesMaterial.Direction = new Vector3(xNoise, yNoise, 0);

        GravityVec = new Vector2(xNoise, yNoise);
    }
}
