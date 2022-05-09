import Sprite from "../sprite.js";
import Vector2 from "../helpers/Vector2.js";
import Process from "../gameProcess.js";

const NUMBER_OF_EXPLOSION_SPRITES = 9;
const FRAMES_FOR_EXPLOSION = 81;
const EXPLOSION_MAX_SCALE = 10;

//Mini asteroid from asteroid explosion
export default class Torpedo extends Sprite {
	/* Constructor Params */
	parentShip;
	fuseFrameDuration;
	frameCreated;

	/* Other attributes */
	delete = false; //Once an item needs to be deleted and stop rendering, set to true
	height = 20;
	width = 10;
	size = new Vector2(1, 1);
	radius = 0.5;
	originalSize = this.size.clone();
	originalRadius = this.radius;
	ctx = "objects";
	hasExploded = false;
	frameExploded = 0;
	process: Process|null = null;

	constructor(fuseFrameDuration = 0, parentShip:any, velocity:Vector2, ...args:[pos:Vector2, game:any]) {
		super(...args);
		this.speed = velocity;
		this.angle = velocity.normalize(); 	// torpedoes point in the direction they are moving
		this.parentShip = parentShip;
		this.image = this.game.images["torpedo"];
		this.fuseFrameDuration = fuseFrameDuration;
		this.frameCreated = this.parentShip.game.frame;
	}
	update() {
		//Add special update code here if needed
		super.update();
		if (this.fuseFrameDuration > 0 && this.parentShip.game.frame - this.frameCreated >= this.fuseFrameDuration) {
			this.explode();  // Explode after fuse expires
		}
		if (this.hasExploded) {
			const currentFrame = this.parentShip.game.frame;
			const framesSinceExploded = currentFrame - this.frameExploded;
			const explosionNumber = Math.floor(framesSinceExploded * NUMBER_OF_EXPLOSION_SPRITES / FRAMES_FOR_EXPLOSION);
			if (explosionNumber < NUMBER_OF_EXPLOSION_SPRITES) {
				this.image = this.game.images["explosion" + explosionNumber];
				this.size = this.originalSize.scale(EXPLOSION_MAX_SCALE * Math.sqrt(framesSinceExploded / FRAMES_FOR_EXPLOSION));
				this.radius = this.originalRadius * EXPLOSION_MAX_SCALE * Math.sqrt(framesSinceExploded / FRAMES_FOR_EXPLOSION)
			} else {
				this.delete = true;
			}
		}
	}
	explode(){
		if (this.hasExploded ) return;
		this.speed = Vector2.zero;
		this.hasExploded = true;
		this.frameExploded = this.parentShip.game.frame;
	}
	receiveDamage() { // torpedoes have 1hp and explode when hitting something
		this.explode();
	}
	initialize(process:any) {
		this.process = process;
	}
}
