
export default class Torpedo /* extends Area2D, IHasScanSignature, IHasCollisionRadius */ {

    constructor() {
        this.age = 0;
        this.maxAge = 1000;
        this.explosionScene = null;
        this. collisionShape2D = null; // CollisionShape2D
        this.explosionArea = null; // Area2D
        this.hasExploded = false;

        this.explosionRadius = 150;
        this.launchSpeed = 600;
        this.scanSignature = "Metals:25|Antimatter:75";
        this.linearVelocity = null;
        this.ownedByShip = null;
        this.fuseDuration = null;
    }

    // Define getters and setters
    get ExplosionRadius() { return this.explosionRadius; }
    set ExplosionRadius(value) { this.explosionRadius = value; }

    get LaunchSpeed() { return this.launchSpeed; }
    set LaunchSpeed(value) { this.launchSpeed = value; }

    get ScanSignature() { return this.scanSignature; }
    get CollisionRadius() { return Mathf.Max(collisionShape2D.Shape.Radius, collisionShape2D.Shape.Height); }

    get LinearVelocity() { return this.linearVelocity; }
    set LinearVelocity(value) { this.linearVelocity = value; }

    get OwnedByShip() { return this.ownedByShip; }
    set OwnedByShip(value) { this.ownedByShip = value; }

    get FuseDuration() { return this.fuseDuration; }
    set FuseDuration(value) { this.fuseDuration = value; }


    // Called when the node enters the scene tree for the first time.
    _Ready() {
        collisionShape2D = FindNode("CollisionShape2D"); // as CollisionShape2D;
        explosionArea = FindNode("ExplosionArea"); // as Area2D;
        // ((FindNode("ExplosionCollisionShape2D") as CollisionShape2D).Shape as CircleShape2D).Radius = ExplosionRadius;
    }

    /**
     * 
     * @param {float} delta 
     * @returns void
     */
    _PhysicsProcess(delta) {
        GlobalPosition = GlobalPosition + LinearVelocity * delta;

        age += delta;

        //Fade away after aging out
        if (age >= maxAge) {
            QueueFree();
        }

        //Explode after fuse expires
        if (FuseDuration > 0 && age >= FuseDuration) {
            explode();
        }
    }

    /**
     * 
     * @param {Node} node
     * @returns void
     */
    onBodyEntered(node)
    {
        switch (node) {
            case ship:
                if (ship == OwnedByShip)
                    return;

                //TODO: Do we want ships to be able to shoot other ships?
                break;
            case body2D:
                explode();
                break;
            default:
                console.error("Unexpected torpedo collision with: " + node.Name);
                // GD.PrintErr("Unexpected torpedo collision with: " + node.Name);
                break;
        }
    }

    /**
     * 
     * @returns void
     */
    explode() {
        //Only explode once
        if (hasExploded)
            return;

        hasExploded = true;

        //Damage everything within our explosion radius
        var bodies = explosionArea.GetOverlappingBodies();
        for (const body of bodies) {
            if (body instanceof IDamageReceiver) {
                body.ReceiveDamage(100);
            }
        }

        let explosion = explosionScene.Instance(); // as Node2D;
        explosion.GlobalPosition = GlobalPosition;
        explosion.GlobalScale = Vector2.One * Torpedo.ExplosionRadius;
        GetParent().AddChild(explosion);

        QueueFree();
    }
}
