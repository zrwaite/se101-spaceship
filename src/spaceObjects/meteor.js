import Sprite from "../sprite.js";
import Vector2 from "../helpers/Vector2.js";
export default class Meteor extends Sprite {
	//Mini asteroid from asteroid explosion
	constructor(speed, ...args) {
		super(...args);
		this.speed = speed;
		this.image = this.game.images["asteroid"];
		this.delete = false; //Once an item needs to be deleted and stop rendering, set to true
		this.size = new Vector2(1, 1);
		this.radius = 0.5;
		this.ctx = "objects";
		this.mass = 0.5;
	}
	update() {
		//Add special update code here if needed
		super.update();
	}
	receiveDamage() { // meteors have 1hp
		this.shatter();
	}
	shatter() {
		this.delete = true
	}
}
