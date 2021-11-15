import Sprite from "../sprite.js";
export default class Meteor extends Sprite {
	//Mini asteroid from asteroid explosion
	constructor(speed, ...args) {
		super(...args);
		this.speed = speed;
		this.image = document.getElementById("asteroid");
		this.delete = false; //Once an item needs to be deleted and stop rendering, set to true
		this.height = 20;
		this.width = 20;
		this.radius = 20;
	}
	update() {
		//Add special update code here if needed
		super.update();
	}
}
