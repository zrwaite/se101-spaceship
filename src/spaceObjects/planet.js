import Sprite from "../sprite.js";
import RenderedObject from "../renderedObject.js";

export default class Planet extends RenderedObject {
	constructor(...args) {
		super(...args);
		this.image = document.getElementById("default-planet");
		this.height = 150;
		this.width = 150;
	}
	update() {
		//Add special update code here if needed
		super.update();
	}
}
