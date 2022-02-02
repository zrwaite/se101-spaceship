import RenderedObject from "../renderedObject.js";
import Vector2 from "../helpers/Vector2.js";

export default class Planet extends RenderedObject {
	constructor(planetName, composition, gravitySignature, ...args) {
		super(...args);
		this.ctx = "planets";
		this.image = this.game.images[planetName] || this.game.images["planet1"];
		this.name = planetName;
		this.composition = composition;
		this.gravitySignature = gravitySignature;
		this.size = new Vector2(5, 5);
		this.process;
	}
	initialize(process) {
		this.process = process;
	}
	update() {
		//Add special update code here for when zoomed in
		//super.update();
	}
}
