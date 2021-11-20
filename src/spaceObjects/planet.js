import RenderedObject from "../renderedObject.js";
import Vector2 from "../helpers/Vector2.js";

export default class Planet extends RenderedObject {
	constructor(planetName, ...args) {
		super(...args);
		this.ctx = "planets";
		this.image = this.game.images[planetName];
		this.size = new Vector2(5, 5);
	}
	update() {
		//Add special update code here for when zoomed in
		//super.update();
	}
}
