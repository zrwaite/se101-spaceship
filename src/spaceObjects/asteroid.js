import Sprite from "../sprite.js";
import Meteor from "./meteor.js";
import Vector2 from "../helpers/Vector2.js";
export default class Asteroid extends Sprite {
	process;
	constructor(speed, aSpeed, ...args) {
		super(...args);
		this.speed = speed;
        this.aSpeed.set(1, aSpeed);
		this.image = this.game.images["asteroid"];
		this.ctx = "objects";
		this.delete = false; //Once an item needs to be deleted and stop rendering, set to true
		this.size = new Vector2(3, 3);
		this.radius = this.size.x/2;		// asteroids are circles
		this.mass = 5;
		this.gravitySignature = 0;
	}
	initialize(process) {
		this.process = process;
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
		const spawnLocationAngle = Math.PI * 2 / numMeteors;
		for (let i=0; i<numMeteors; i++) {
			// space the meteors evenly around the perimeter of where the asteroid once was
			const posFromCenter = Vector2.right.rotate(i*spawnLocationAngle).scale(this.radius*0.7);
			// generate a random direction and speed for meteor to go
			const velocity = Vector2.right.rotate(Math.random()*2*Math.PI).scale(0.3*Math.random());

			let meteor = new Meteor(velocity, posFromCenter.add(this.pos), this.game);
			this.process.spawnDeletableObject(meteor);
		}
	}
	boundaries(){
		if (this.pos.y>this.game.height+this.size.y || this.pos.y<-this.size.y || 
			this.pos.x>this.game.width+this.size.x || this.pos.x<-this.size.x) 
			this.delete=true; // bounds detection for deletion
	}
	receiveDamage() { // asteroids have 1hp
		this.shatter();
	}
}
