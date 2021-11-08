import Sprite from "../sprite.js";
import Meteor from "./meteor.js";
export default class Asteroid extends Sprite {
	constructor(speed, ...args) {
		super(...args);
		this.speed = speed;
		this.image = document.getElementById("asteroid");
		this.delete = false; //Once an item needs to be deleted and stop rendering, set to true
		this.height = 50;
		this.width = 50;
		this.radius = 50;
	}
	update(deltaTime) {
		//Add special update code here if needed
		super.update();
	}
	shatter() {
		//Create a bunch of meteors, somewhat randomly.
		//this.delete = true
		// meteor1 = new Meteor(new Vector2(50, 30), this.pos, this.game);
		// this.game.delObjects.push(meteor1);
	}
}
