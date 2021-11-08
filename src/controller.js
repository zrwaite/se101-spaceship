export default class Controller {
	constructor() {
		this.pressed = {
			left: false,
			up: false,
			right: false,
			down: false
		};
		this.dir = "right";
		this.controls = {
			left: 37,
			up: 38,
			right: 39,
			down: 40
		};
		document.addEventListener("keydown", (event) => {
			switch (event.keyCode) {
				case this.controls.left:
					this.pressed.left = true;
					break;
				case this.controls.up:
					this.pressed.up = true;
					break;
				case this.controls.right:
					this.pressed.right = true;
					break;
				case this.controls.down:
					this.pressed.down = true;
					break;
			}
		});
		document.addEventListener("keyup", (event) => {
			switch (event.keyCode) {
				case this.controls.left:
					this.pressed.left = false;
					break;
				case this.controls.up:
					this.pressed.up = false;
					break;
				case this.controls.right:
					this.pressed.right = false;
					break;
				case this.controls.down:
					this.pressed.down = false;
					break;
			}
		});
	}
}
