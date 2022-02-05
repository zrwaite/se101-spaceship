import Sprite from "../sprite.js";
import Vector2 from "../helpers/Vector2.js";
//Mini asteroid from asteroid explosion
export default class Meteor extends Sprite {
	/* Other attributes */
	process;
	delete = false; //Once an item needs to be deleted and stop rendering, set to true
	size = new Vector2(1, 1);
	radius = 0.5;
	ctx = "objects";
	mass = 0.5;

	constructor(speed, ...args) {
		super(...args);
		this.speed = speed;
		this.image = this.game.images["asteroid"];
	}
	initialize(process) {
		this.process = process;
	}
	update() {
		super.update();
	}
	receiveDamage() { // meteors have 1hp
		this.shatter();
	}
	shatter() {
		this.delete = true
	}
}
