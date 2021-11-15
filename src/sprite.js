import Vector2 from "../Sandbox/Scripts/Helpers/Vector2.js";
import RenderedObject from "./renderedObject.js";
export default class Sprite extends RenderedObject{
	constructor(...args){
		super(...args)
		// this.pos = new Vector(0, 0); --> Already from RenderedObject
		this.speed = new Vector2(0, 0); //linear speed
		this.accel = new Vector2(0, 0); //linear acceleration
		this.maxSpeed = 100; //Max linear speed
		// this.angle = 0; --> Already, from RenderedObject
		this.aSpeed = 0; //angle speed
		this.aAccel = 0; //angle acceleration
		this.maxASpeed = 20; //Max anglular speed
		this.radius; 
		this.mass;
	}
	update() {
		// All Simple Physics
		// Add accelerations to speeds:
		this.speed.add(this.accel);
		this.aSpeed += this.aAccel;
		// Add speeds to positions
		this.pos.add(this.speed);
		this.aPos += this.aSpeed;
		this.boundsDetect(); //Detect boundaries for position and speed
	}
	boundsDetect(){
		if (this.pos.y>this.game.height){ //y pos bounds
			this.pos.y = this.game.height;
			this.speed.y = 0;
		} else if (this.pos.y<0) {
			this.pos.y = 0;
			this.speed.y = 0;
		}
		if (this.pos.x>this.game.width){ // x pos bounds
			this.pos.x = this.game.width;
			this.speed.x = 0;
		} else if (this.pos.x<0) {
			this.pos.x = 0;
			this.speed.x = 0;
		}
		// y speed bounds
		if (this.speed.y>this.maxSpeed) this.speed.y = this.maxSpeed;
		// x speed bounds
		if (this.speed.x>this.maxSpeed) this.speed.x = this.maxSpeed;
		// angle speed bounds
		if (this.aSpeed>this.maxASpeed) this.aSpeed = this.maxASpeed;
	}
}
