export default class Controller {
    constructor(game) {
        this.pressed = {
            //Store if a key is pressed
            left: false,
            up: false,
            right: false,
            down: false,
            q: false,
            e: false,
        };
        this.game = game;
        document.addEventListener('keydown', (event) => {
            var _a, _b, _c;
            let pressCode = event.keyCode;
            if (pressCode === 37 || pressCode === 65) {
                this.pressed.left = true; // Press Left
            }
            else if (pressCode === 38 || pressCode === 87) {
                this.pressed.up = true; // Press Up
            }
            else if (pressCode === 39 || pressCode === 68) {
                this.pressed.right = true; // Press Right
            }
            else if (pressCode === 40 || pressCode === 83) {
                this.pressed.down = true; // Press Down
            }
            else if (pressCode === 81) {
                this.pressed.q = true;
            }
            else if (pressCode === 69) {
                this.pressed.e = true;
            }
            else if (pressCode === 32) {
                //Press space
                (_a = this.game.watchShip) === null || _a === void 0 ? void 0 : _a.tryFire();
            }
            else if (pressCode === 77) {
                (_b = this.game.watchShip) === null || _b === void 0 ? void 0 : _b.tryWarp();
            }
            else if (pressCode === 76) {
                (_c = this.game.watchShip) === null || _c === void 0 ? void 0 : _c.tryLand();
            }
        });
        document.addEventListener('keyup', (event) => {
            let pressCode = event.keyCode;
            if (pressCode === 37 || pressCode === 65) {
                this.pressed.left = false; // un-Press Left
            }
            else if (pressCode === 38 || pressCode === 87) {
                this.pressed.up = false; // un-Press Up
            }
            else if (pressCode === 39 || pressCode === 68) {
                this.pressed.right = false; // un-Press Right
            }
            else if (pressCode === 40 || pressCode === 83) {
                this.pressed.down = false; // un-Press Down
            }
            else if (pressCode === 81) {
                this.pressed.q = false;
            }
            else if (pressCode === 69) {
                this.pressed.e = false;
            }
        });
    }
}
