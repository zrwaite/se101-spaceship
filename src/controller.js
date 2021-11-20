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
            let pressCode = event.keyCode;
            if (pressCode == 37 || pressCode == 65) {
                this.pressed.left = true; // Press Left
            } else if (pressCode == 38 || pressCode == 87) {
                this.pressed.up = true; // Press Up
            } else if (pressCode == 39 || pressCode == 68) {
                this.pressed.right = true; // Press Right
            } else if (pressCode == 40 || pressCode == 83) {
                this.pressed.down = true; // Press Down
            }
		});
		document.addEventListener("keyup", (event) => {
			let pressCode = event.keyCode;
            if (pressCode == 37 || pressCode == 65) {
                this.pressed.left = false; // un-Press Left
            } else if (pressCode == 38 || pressCode == 87) {
                this.pressed.up = false; // un-Press Up
            } else if (pressCode == 39 || pressCode == 68) {
                this.pressed.right = false; // un-Press Right
            } else if (pressCode == 40 || pressCode == 83) {
                this.pressed.down = false; // un-Press Down
            }
		});
	}
}
