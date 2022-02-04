import RenderedObject from "../renderedObject.js";
import Vector2 from "../helpers/Vector2.js";

export default class Planet extends RenderedObject {
	process;
	constructor(planetName, composition, ...args) {
		super(...args);
		this.ctx = "planets";
		this.image = this.game.images[planetName] || this.game.images["planet1"];
		this.name = planetName;
		this.composition = composition;
		this.gravitySignature = 2;
		this.size = new Vector2(5, 5);
		this.radius = 1.5;
	}
	initialize(process) {
		this.process = process;
	}
}