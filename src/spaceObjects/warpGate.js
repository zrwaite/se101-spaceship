import Sprite from "../sprite.js";
export default class WarpGate extends RenderedObject {
	constructor(...args) {
		super(...args);
		this.image = document.getElementById("warp-gate");
		this.height = 50;
		this.width = 50;
	}
	update(deltaTime) {
		//Add special update code here if needed
		super.update();
	}
}
