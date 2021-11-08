import Vector2 from "../Sandbox/Scripts/Helpers/Vector2";
import RenderedObject from "./renderedObject.js";
export default class Sprite extends RenderedObject{
	constructor(...args){
		super(...args)
		this.speed = new Vector2(0, 0);
		this.accel = new Vector2(0, 0);
		this.maxSpeed = 100;
		this.aPos = new Vector2(0,1);
		this.aSpeed = new Vector2(0,0);
		this.aAccel = new Vector2(0,0);
		this.maxASpeed = 20;
		this.radius; 
		this.mass;
	}
	update(deltaTime) {
		//Simple physics
		this.speed.x += this.accel.x;
		this.speed.y += this.accel.y;
		this.aSpeed += this.aAccel;
		this.pos.x += this.speed.x;
		this.pos.y += this.speed.y;
		this.aPos += this.aSpeed;
		this.boundsDetect();
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
