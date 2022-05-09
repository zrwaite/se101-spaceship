import Sprite from "../sprite.js";
import Vector2 from "../helpers/Vector2.js";
//Mini asteroid from asteroid explosion
export default class Meteor extends Sprite {
	/* Other attributes */
	process:any;
	delete = false; //Once an item needs to be deleted and stop rendering, set to true
	size = new Vector2(1, 1);
	radius = 0.5;
	ctx:string = "objects";
	mass = 0.5;
	speed: Vector2;
	hasExploded = false;

	constructor(speed:Vector2, ...args:[pos:Vector2, game:any]) {
		super(...args);
		this.speed = speed;
		this.image = this.game.images["asteroid"];
	}
	initialize(process:any) {
		this.process = process;
	}
	update() {
		super.update();
	}
	receiveDamage() { // meteors have 1hp
		this.shatter();
	}
	shatter() {
		this. hasExploded = true;
		this.delete = true;
	}
}
