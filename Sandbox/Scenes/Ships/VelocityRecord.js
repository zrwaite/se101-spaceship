export class VelocityRecord {
    constructor() {
        // Internal
        this.velocityLastFrame = null;
        this.parentRigidBody = null;
    }

    // PROPERTIES
	// getters and settings for VelocityLastFrame property
	get VelocityLastFrame() { return this.velocityLastFrame; }
	set VelocityLastFrame(value) {
		this.velocityLastFrame = value;
	}

	// Called when the node enters the scene tree for the first time.
	_Ready() {
        this.parentRigidBody = GetParent<RigidBody2D>();
	}

    // Equivalent to the update function, I believe
    _PhysicsProcess() {
        this.velocityLastFrame = parentRigidBody.LinearVelocity;
    }

    update() { _PhysicsProcess(); }
}