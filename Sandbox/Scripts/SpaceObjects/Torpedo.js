
export default class Torpedo /* extends Area2D, IHasScanSignature, IHasCollisionRadius */ {
    // [Export] float maxAge = 10f;
    // [Export] PackedScene explosionScene;

    // public static float ExplosionRadius { get; private set; } = 150f;
    // public static float LaunchSpeed {get; private set;} = 600;

    constructor() {
        this.age = 0;
        this. collisionShape2D = null; // CollisionShape2D
        this.explosionArea = null; // Area2D
        this.hasExploded = false;
    }

    //Properties
    // public string ScanSignature { get { return "Metals:25|Antimatter:75"; } }
    // public float CollisionRadius { get { return Mathf.Max((collisionShape2D.Shape as CapsuleShape2D).Radius, (collisionShape2D.Shape as CapsuleShape2D).Height); } }
    // public Vector2 LinearVelocity { get; set; }
    // public ColonyShip OwnedByShip { get; set; }
    // public float FuseDuration { get; set; }


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
            Explode();
        }
    }

    /**
     * 
     * @param {Node} node
     * @returns void
     */
    OnBodyEntered(node)
    {
        switch (node) {
            case ship:
                if (ship == OwnedByShip)
                    return;

                //TODO: Do we want ships to be able to shoot other ships?
                break;
            case body2D:
                Explode();
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
    Explode() {
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
