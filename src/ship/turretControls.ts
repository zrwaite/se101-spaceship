import Vector2 from "../helpers/Vector2.js";
import Torpedo from "./torpedo.js";
import APIResponse from "../helpers/response.js";
import RenderedObject from "../renderedObject.js";
import ColonyShip from "./colonyShip.js";
import Game from "../game.js";

const TUBE_COOLDOWN_FRAMES = 100;
const NUMBER_OF_TUBES  = 4;
const TORPEDO_VELOCITY = 0.3;
const FUSE_FRAME_DURATION = undefined;

export default class TurretControls extends RenderedObject{
	/* Constuctor Params */
	parentShip;

	/* Other Attributes */
	cooldownFrames = TUBE_COOLDOWN_FRAMES;
	numberOfTubes = NUMBER_OF_TUBES;
	lastFrameFiredByTube = Array(NUMBER_OF_TUBES).fill(-Infinity);
	launchSpeed = TORPEDO_VELOCITY;
	ctx = "ships";

    constructor(parentShip:ColonyShip, ...args:[pos:Vector2, game:Game]){
		super(...args);
		this.image = this.game.images["turret"];
		this.parentShip = parentShip;
		this.pos = this.parentShip.pos;
	}
	update() {
		this.pos = this.parentShip.pos;
	}
	// This is currently assumed to be an absolute direction, it can be implemented as a relative direction through a change of basis
	aimTurret(aimTo:Vector2){
		//User called function for aiming turret
		const newDirection = aimTo.normalize();
		if (newDirection.magnitude() > 0) {
			this.angle = newDirection;
			return new APIResponse(200, [], {}, true);
		} else {
			const errorMessage = "aimTurret failed due to zero aimTo and undefined direction; no update to aim made";
			return new APIResponse(400, [errorMessage], {}, false);
		}
	}
	getNumberOfTubes(){
		return new APIResponse(200, [], {numberOfTubes: this.numberOfTubes}, true);
	}
	getTubeCooldown(tubeIndex:number) {
		if (tubeIndex >= 0 && tubeIndex < NUMBER_OF_TUBES) {
			//User called function for getting tube cooldown
			const currentFrame = this.parentShip.game.frame;
			const framesWaited = currentFrame - this.lastFrameFiredByTube[tubeIndex];
            const framesToWait = Math.max(this.cooldownFrames - framesWaited, 0);
			return new APIResponse(200, [], {tubeCooldown: framesToWait}, true);
		} else {
			// Invalid tubeIndex
			const errorMessage = "getTubeCooldownFailed due to invalid tube index; expected tubeIndex from 0 (inclusive) up to " + NUMBER_OF_TUBES + " (exclusive) but received " + tubeIndex;
			return new APIResponse(400, [errorMessage], {}, false);
		}
	}
	fireTorpedo(tubeIndex:number){
		//User called function for firing torpedo
		//check for valid torpedo stuff, then create new one
		if (tubeIndex >= 0 && tubeIndex < NUMBER_OF_TUBES) {
			const tubeCooldownResponse = this.getTubeCooldown(tubeIndex);
			if (tubeCooldownResponse.response["tubeCooldown"] === 0) {
				const torpedoVelocity = this.angle.scale(this.launchSpeed)		// calculate velocity of fired missile
				const newTorpedo = new Torpedo(FUSE_FRAME_DURATION, this.parentShip, torpedoVelocity, this.parentShip.pos, this.parentShip.game)
				this.parentShip.process.spawnDeletableObject(newTorpedo);
				this.parentShip.torpedoesFired++;
                this.parentShip.energyUsed += 8;
				this.lastFrameFiredByTube[tubeIndex] = this.parentShip.game.frame;
                return new APIResponse(200, [], {}, true);
			} else {
				const errorMessage = "fireTorpedo failed due to internal call to getTubeCooldown not returning zero tubeCooldown response for tubeIndex " + tubeIndex;
				return new APIResponse(400, [errorMessage], {}, false);
			}
		} else {
			const errorMessage = "fireTorpedo due to invalid tube index; expected tubeIndex from 0 (inclusive) up to " + NUMBER_OF_TUBES + " (exclusive) but received " + tubeIndex;
			return new APIResponse(400, [errorMessage], {}, false);
		}
	}
}
