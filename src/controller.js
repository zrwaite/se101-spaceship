export default class Controller {
	constructor() {
		this.pressed = { //Store if a key is pressed
			left: false,
			up: false,
			right: false,
			down: false
		};
		this.controls = { //Store the control keycodes for readability
			left: 37,
			up: 38,
			right: 39,
			down: 40
		};
		document.addEventListener("keydown", (event) => {
			switch (event.keyCode) {
				case this.controls.left:
					this.pressed.left = true; //Click left
					break;
				case this.controls.up:
					this.pressed.up = true;//Click up
					break;
				case this.controls.right:
					this.pressed.right = true;//Click right
					break;
				case this.controls.down:
					this.pressed.down = true;//Click down
					break;
			}
		});
		document.addEventListener("keyup", (event) => {
			switch (event.keyCode) {
				case this.controls.left:
					this.pressed.left = false;//unClick left
					break;
				case this.controls.up:
					this.pressed.up = false;//unClick up
					break;
				case this.controls.right:
					this.pressed.right = false;//unClick right
					break;
				case this.controls.down:
					this.pressed.down = false;//unClick down
					break;
			}
		});
	}
}
