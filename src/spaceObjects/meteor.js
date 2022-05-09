import Sprite from "../sprite.js";
import Vector2 from "../helpers/Vector2.js";
//Mini asteroid from asteroid explosion
export default class Meteor extends Sprite {
    constructor(speed, ...args) {
        super(...args);
        this.delete = false; //Once an item needs to be deleted and stop rendering, set to true
        this.size = new Vector2(1, 1);
        this.radius = 0.5;
        this.ctx = "objects";
        this.mass = 0.5;
        this.hasExploded = false;
        this.speed = speed;
        this.image = this.game.images["asteroid"];
    }
    initialize(process) {
        this.process = process;
    }
    update() {
        super.update();
    }
    receiveDamage() {
        this.shatter();
    }
    shatter() {
        this.hasExploded = true;
        this.delete = true;
    }
}
