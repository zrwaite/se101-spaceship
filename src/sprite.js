import Vector2 from "./helpers/Vector2.js";
import RenderedObject from "./renderedObject.js";
export default class Sprite extends RenderedObject{
	constructor(...args){
		super(...args)
		// this.pos = new Vector(0, 0); --> Already from RenderedObject
		this.speed = new Vector2(0, 0); //linear speed
		this.accel = new Vector2(0, 0); //linear acceleration
		this.maxSpeed = 100; //Max linear speed
		// this.angle = 0; --> Already, from RenderedObject
		this.aSpeed = new Vector2(1, 0); //angle speed
		this.aAccel = new Vector2(1, 0); //angle acceleration
		//console.log(this.aAccel.angle());
		this.maxASpeed = 20; //Max anglular speed
		this.radius; 
		this.mass;
	}
	update() {
		// All Simple Physics
		// Add accelerations to speeds:
		this.speed = this.speed.add(this.accel);
		this.aSpeed = this.aSpeed.rotate(this.aAccel.angle());
		// Add speeds to positions
		this.pos = this.pos.add(this.speed);
		this.angle = this.angle.rotate(this.aSpeed.angle());
		this.boundsDetect(); //Detect boundaries for position and speed
		
		// delete sprites that are heavily oob
		if (this.pos.x < -2*this.game.width || this.pos.x > 2*this.game.width || this.pos.y < -2*this.game.height || this.pos.y > 2*this.game.height) {
			this.delete = true;
		}
	}
	boundsDetect(){
		// y speed bounds
		if (this.speed.y>this.maxSpeed) this.speed.y = this.maxSpeed;
		// x speed bounds
		if (this.speed.x>this.maxSpeed) this.speed.x = this.maxSpeed;
		// angle speed bounds
		if (this.aSpeed>this.maxASpeed) this.aSpeed = this.maxASpeed;
	}
}
