import Sprite from "../sprite.js";
import Meteor from "./meteor.js";
import Vector2 from "../helpers/Vector2.js";
export default class Asteroid extends Sprite {
	constructor(speed, aSpeed, ...args) {
		super(...args);
		this.speed = speed;
        this.aSpeed.set(1, aSpeed);
		this.image = this.game.images["asteroid"];
		this.ctx = "objects";
		this.delete = false; //Once an item needs to be deleted and stop rendering, set to true
		this.size = new Vector2(3, 3);
		this.radius = this.size.x/2;		// asteroids are circles
	}
	update() {
		//Add special update code here if needed
		super.update();
		this.boundaries();
	}
	shatter() {
		// Create a bunch of meteors, somewhat randomly.
		this.delete = true
		// randomly 2-5 meteors
		const numMeteors = Math.floor(2 + Math.random() * 4);
		for (let i=0; i<numMeteors; i++) {
			// generate a random direction for meteor to go
			const velocity = Vector2.right.rotate(Math.random()*2*Math.PI).scale(0.1);
			let meteor = new Meteor(velocity, this.pos, this.game);
			this.game.spawnDeletableObject(meteor);
		}
	}
	boundaries(){
		if (this.pos.y>this.game.height+this.size.y || this.pos.y<-this.size.y || 
			this.pos.x>this.game.width+this.size.x || this.pos.x<-this.size.x) 
			this.delete=true; // bounds detection for deletion
	}
}
