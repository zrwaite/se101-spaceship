import Vector2 from "../helpers/Vector2.js";
import Torpedo from "./torpedo.js";
import response from "../helpers/response.js";

const TUBE_COOLDOWN_FRAMES = 30;
const NUMBER_OF_TUBES  = 4;
const TORPEDO_VELOCITY = 0.2;
const FUSE_FRAME_DURATION = undefined;

export default class TurretControls{
    constructor(parentShip){
		this.parentShip = parentShip;
		this.cooldown_frames = TUBE_COOLDOWN_FRAMES;
		this.numberOfTubes = NUMBER_OF_TUBES;
		this.direction = new Vector2(1,0); // Default
		this.lastFrameFiredByTube = Array(NUMBER_OF_TUBES).fill(-Infinity);
		this.launchSpeed = TORPEDO_VELOCITY;
	}
	// This is currently assumed to be an absolute direction, it can be implemented as a relative direction through a change of basis
	aimTurret(aimTo){
		//User called function for aiming turret
		const newDirection = aimTo.normalize();
		if (newDirection.magnitude() > 0) {
			this.direction = newDirection;
			return new response(200, [], {}, true);
		} else {
			const errorMessage = "aimTurret failed due to zero aimTo and undefined direction; no update to aim made";
			console.log(errorMessage);
			return new response(400, [errorMessage], {}, false);
		}
	}
	getNumberOfTubes(){
		return new response(200, [], {numberOfTubes: this.numberOfTubes}, true);
	}
	getTubeCooldown(tubeIndex){
		if (tubeIndex < 0 || tubeIndex >= NUMBER_OF_TUBES) {
			const errorMessage = "getTubeCooldownFailed due to invalid tube index; expected tubeIndex from 0 (inclusive) up to " + NUMBER_OF_TUBES + " (exclusive) but received " + tubeIndex;
			console.log(errorMessage);
			return new response(400, [errorMessage], {}, false);
		}
		//User called function for getting tube cooldown
		const currentFrame = this.parentShip.game.frame;
		const framesWaited = currentFrame - this.lastFrameFiredByTube[tubeIndex];
		const framesToWait = Math.max(TUBE_COOLDOWN_FRAMES - framesWaited, 0);
		return new response(200, [], {tubeCooldown: framesToWait}, true);
	}
	fireTorpedo(tubeIndex){
		//User called function for firing torpedo
		//check for valid torpedo stuff, then create new one
		if (tubeIndex < 0 || tubeIndex >= NUMBER_OF_TUBES) {
			const errorMessage = "fireTorpedo due to invalid tube index; expected tubeIndex from 0 (inclusive) up to " + NUMBER_OF_TUBES + " (exclusive) but received " + tubeIndex;
			console.log(errorMessage);
			return new response(400, [errorMessage], {}, false);
		}
		const tubeCooldownResponse = this.getTubeCooldown(tubeIndex);
		if (!tubeCooldownResponse.success) {
			const errorMessage = "fireTorpedo failed due to failure of internal call to getTubeCooldown";
			console.log(errorMessage);
			tubeCooldownResponse.errors.push(errorMessage);
			return tubeCooldownResponse;
		}
		if (tubeCooldownResponse.response["tubeCooldown"] == 0) {
			const torpedoVelocity = this.direction.scale(this.launchSpeed)		// calculate velocity of fired missile
			const newTorpedo = new Torpedo(FUSE_FRAME_DURATION, this.parentShip, torpedoVelocity, this.parentShip.pos, this.parentShip.game)
			this.parentShip.game.spawnDeletableObject(newTorpedo);
			this.parentShip.TorpedoesFired++;
			this.lastFrameFiredByTube[tubeIndex] = this.parentShip.game.frame;
		}
		return new response(200, [], {}, true);
	}
}
