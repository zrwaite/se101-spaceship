import Sprite from "../sprite.js";
import Vector2 from "../helpers/Vector2.js";

import RenderedObject from "../renderedObject.js";
export default class WarpGate extends RenderedObject {
	constructor(destinationSolarystem, ...args) {
		super(...args);
		this.image = this.game.images["warpgate"];
		this.ctx = "planets";
		this.size = new Vector2(5, 5);
		this.radius = 1.5;
		this.destinationSolarSystem = destinationSolarystem;
        this.gravitySignature = 1;
	}
	update() {
		//Add special update code here if needed
		// super.update();
	}
	warp(){
		console.log("warping");
		this.game.newSolarSystem(this.destinationSolarSystem, this.game.numShips);
		//send signal to game to start new solarSystem
	}
}
