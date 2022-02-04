export default class Controller {
    game;
    pressed = { //Store if a key is pressed
        left: false,
        up: false,
        right: false,
        down: false,
        q: false,
        e: false
    };
	constructor(game) {
        this.game = game;
		document.addEventListener("keydown", (event) => {
            let pressCode = event.keyCode;
            if (pressCode === 37 || pressCode === 65) {
                this.pressed.left = true; // Press Left
            } else if (pressCode === 38 || pressCode === 87) {
                this.pressed.up = true; // Press Up
            } else if (pressCode === 39 || pressCode === 68) {
                this.pressed.right = true; // Press Right
            } else if (pressCode === 40 || pressCode === 83) {
                this.pressed.down = true; // Press Down
            } else if (pressCode === 81) {
                this.pressed.q = true;
            } else if (pressCode === 69) {
                this.pressed.e = true;
            } else if (pressCode === 32) { //Press space
                this.game.watchShip.tryFire();
            } else if (pressCode === 77) {
                this.game.watchShip.tryWarp();
            } else if (pressCode === 76) {
                this.game.watchShip.tryLand();
            }
		});
		document.addEventListener("keyup", (event) => {
			let pressCode = event.keyCode;
            if (pressCode === 37 || pressCode === 65) {
                this.pressed.left = false; // un-Press Left
            } else if (pressCode === 38 || pressCode === 87) {
                this.pressed.up = false; // un-Press Up
            } else if (pressCode === 39 || pressCode === 68) {
                this.pressed.right = false; // un-Press Right
            } else if (pressCode === 40 || pressCode === 83) {
                this.pressed.down = false; // un-Press Down
            } else if (pressCode === 81) {
                this.pressed.q = false;
            } else if (pressCode === 69) {
                this.pressed.e = false;
            } 
		});
	}
}
