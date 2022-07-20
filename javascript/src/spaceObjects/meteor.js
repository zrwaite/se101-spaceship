import Sprite from '../sprite.js';
import Vector2 from '../helpers/Vector2.js';
//Mini asteroid from asteroid explosion
export default class Meteor extends Sprite {
    constructor(speed, ...args) {
        super(...args);
        /* Other attributes */
        this.process = null;
        this.delete = false; //Once an item needs to be deleted and stop rendering, set to true
        this.size = new Vector2(10, 10);
        this.radius = 5;
        this.ctx = 'objects';
        this.mass = 1;
        this.hasExploded = false;
        this.speed = speed;
        this.image = this.game.images['asteroid'];
    }
    initialize(process) {
        this.process = process;
    }
    update() {
        super.update();
    }
    receiveDamage() {
        // meteors have 1hp
        this.shatter();
    }
    shatter() {
        this.hasExploded = true;
        this.delete = true;
    }
}
