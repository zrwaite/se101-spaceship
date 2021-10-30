// global variable? AngularVelocity, GlobalPosition

// inherits RigidBody2D
// implements IDamageReceiver, IHasScanSignature, IHasCollisionRadius
export default class AsteroidDebris {
    constructor() {
        // internal
        this.collisonShape = null;      // CollisionShape2D
    }

    // PROPERTIES
	// getter for IHasScanSignature
    get ScanSignature() { return "Rock:90|Common:10"; }

    // getter for IHasCollisionRadius
    get CollisionRadius() { return this.collisionShape.Shape.Radius; }

    _Ready() {
        this.collisionShape = GetNode<CollisionShape2D>("CollisionShape2D");
        AngularVelocity = (Math.random() - 0.5) * 55;
    }

    _PhysicsProcess() {
        if(GlobalPosition.LengthSquared() > 10000000){
            QueueFree();
        }
    }

    // getter for IDamageReceiver
    ReceiveDamage() {
        QueueFree();
    }
}