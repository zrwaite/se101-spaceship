import Sprite from "../sprite.js";
import Vector2 from "../helpers/Vector2.js";

export default class Torpedo extends Sprite {
	//Mini asteroid from asteroid explosion
	constructor(fuseDuration, parentShip, velocity, ...args) {
		super(...args);
		this.speed = velocity;
		this.angle = velocity.normalize(); 	// torpedoes point in the direction they are moving
		this.parentShip = parentShip;
		// TO DO, find the missle image
		this.image = this.game.images["ship"];
		this.delete = false; //Once an item needs to be deleted and stop rendering, set to true
		this.height = 20;
		this.width = 10;
		this.size = new Vector2(1, 1);
		this.radius = 0.5;
		this.ctx = "objects";
		this.hasExploded = false;
	}
	update() {
		//Add special update code here if needed
		super.update();
	}
	explode(){
		// currently, I am not sure if this flag variable is necessary
		// but it wont hurt, and it will help if we need to ever keep the torpedo alive while its exploding
		if (this.hasExploded ) {
			return;
		}
		this.hasExploded = true;

		// If the torpedo has an explosion radius larger than its hitbox, then here would be where 
		// we would do the check and shatter any asteroids if necessary. 
		// For the time being, we can have the game shatter asteroidsm instead

		this.delete = true;
	}
}
