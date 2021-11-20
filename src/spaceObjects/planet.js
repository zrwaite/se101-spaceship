import RenderedObject from "../renderedObject.js";
import Vector2 from "../helpers/Vector2.js";

export default class Planet extends RenderedObject {
	constructor(planetName, composition, gravitySignature, ...args) {
		super(...args);
		this.ctx = "background";
		this.image = this.game.images[planetName];
		this.name = planetName;
		this.composition = composition;
		this.gravitySignature = gravitySignature;
		this.size = new Vector2(35, 35);
	}
	update() {
		//Add special update code here if needed
		//super.update();
	}
}
