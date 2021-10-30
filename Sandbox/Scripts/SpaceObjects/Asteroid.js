import * as Vector2 from "./../Helpers/Vector2"

// implements IDamageReceiver, IHasScanSignature, IHasCollisionRadius
export default class Asteroid {
    constructor() {
        // external
        this.angularVelocityRange = 5;      // number
        this.asteroidDebrisScene = null;    // PackedScene
        // internal
        this.collisonShape = null;          // CollisionShape2D
    }

    // PROPERTIES
	// getter for IHasScanSignature
    get ScanSignature() { return "Rock:90|Common:10"; }

    // getter for IHasCollisionRadius
    get CollisionRadius() { return this.collisionShape.Shape.Radius; }

    _Ready() {
        this.collisionShape = GetNode<CollisionShape2D>("CollisionShape2D");
        AngularVelocity = (float)((Math.random() - 0.5) * angularVelocityRange);
    }

    _PhysicsProcess() {
        if(GlobalPosition.LengthSquared() > 10000000){
            QueueFree();
        }
    }

    // getter for IDamageReceiver
    ReceiveDamage() {
        this.Shatter();
    }

    // asteroid gets removed and replaced with a bunch of debris
    Shatter()
    {
        // debrisCount integer from 1 to 5
        let debrisCount = Math.floor(Math.random()*5 + 1);

        for (let i = 0; i < debrisCount; i++)
        {
            //TODO: Spawn a bunch of fast-moving debris
            let offset = Vector2.right.scale(CollisionRadius * 0.75);
            let angleStep = Math.PI * 2 / debrisCount;
            offset = offset.rotate(angleStep * i);

            // random float in [100, 600]
            let outboundSpeed = Math.random()*500 + 100;
            // random float in [-300, 300]
            let outboundAngularVelocity = Math.random()*600 - 300;

            // add a new asteroidDebris to the scene
            /*
            RigidBody2D debrisInstance = asteroidDebrisScene.Instance() as RigidBody2D;
            debrisInstance.GlobalPosition = GlobalPosition + offset;
            debrisInstance.LinearVelocity = offset.Normalized() * outboundSpeed;
            debrisInstance.AngularVelocity = outboundAngularVelocity;
            
            //GetParent().AddChild(debrisInstance);
            GetParent().CallDeferred("add_child", debrisInstance);
            */
        }

        QueueFree();
    }
}