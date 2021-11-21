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
	}
	update() {
		//Add special update code here if needed
		super.update();
	}
	explode(){
		//fun explosion stuffssssss
		// this.delete = true;
	}
}
