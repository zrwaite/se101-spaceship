import RenderedObject from "../renderedObject.js";
import Vector2 from "../helpers/Vector2.js";

export default class Planet extends RenderedObject {
	/* Default Params */
	gravitySignature = 2;
	size = new Vector2(5, 5);
	radius = 1.5;
	ctx = "planets";

	/* Other attributes */
	process;
	composition;
	constructor(planetName, composition, ...args) {
		super(...args);
		this.image = this.game.images[planetName] || this.game.images["planet1"];
		this.name = planetName;
		this.composition = composition;
	}
	initialize(process) {
		this.process = process;
	}
}