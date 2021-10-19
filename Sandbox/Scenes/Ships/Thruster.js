import * as Mathf from "../../Scripts/Helpers/Mathf";
import * as Vector2 from "../../Scripts/Helpers/Vector2";

// Not sure where unity gets this variable, so ill define it here for now
const GlobalRotation = 0;

// originally extended Node2D
export class Thruster {
	constructor() {
		// External (technically for JS, every member is public)
		this.maxThrustForce = null;			// float
		// Internal
		this.throttle = null;				// float
		this.flameSprite = null;			// Sprite
	}

	// PROPERTIES
	// getters and settings for Throttle property
	get Throttle() { return this.throttle; }
	set Throttle(value) {
		throttle = Mathf.Clamp(value, 0.0, 1.0);
		flameSprite.Scale = Vector2.one.scale(throttle);
	}

	// Called when the node enters the scene tree for the first time.
	_Ready() {
        this.flameSprite = GetNode<Sprite>("Flame");
	}

	/**
	 *	@returns {Vector2}
	 */
    GetResultantThrustVector() {
        return Vector2.right.rotate(GlobalRotation).scale(this.throttle * this.maxThrustForce);
    }
}

