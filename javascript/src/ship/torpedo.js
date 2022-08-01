import Sprite from '../sprite.js';
import Vector2 from '../helpers/Vector2.js';
//Mini asteroid from asteroid explosion
export default class Torpedo extends Sprite {
    constructor(velocity, ...args) {
        super(...args);
        /* Constructor Params */
        this.fuseFrameDuration = 0;
        this.NUMBER_OF_EXPLOSION_SPRITES = 9;
        this.FRAMES_FOR_EXPLOSION = 81;
        this.EXPLOSION_MAX_SCALE = 10;
        /* Other attributes */
        this.delete = false; //Once an item needs to be deleted and stop rendering, set to true
        this.size = new Vector2(10, 10);
        this.radius = 5;
        this.originalSize = this.size.clone();
        this.originalRadius = this.radius;
        this.ctx = 'objects';
        this.hasExploded = false;
        this.frameExploded = 0;
        this.process = null;
        this.speed = velocity;
        this.angle = velocity.angle(); // torpedoes point in the direction they are moving
        this.image = this.game.images['torpedo'];
        this.frameCreated = this.game.frame;
    }
    update() {
        //Add special update code here if needed
        super.update();
        if (this.fuseFrameDuration > 0 && this.game.frame - this.frameCreated >= this.fuseFrameDuration) {
            this.explode(); // Explode after fuse expires
        }
        if (this.hasExploded) {
            const currentFrame = this.game.frame;
            const framesSinceExploded = currentFrame - this.frameExploded;
            const explosionNumber = Math.floor((framesSinceExploded * this.NUMBER_OF_EXPLOSION_SPRITES) / this.FRAMES_FOR_EXPLOSION);
            if (explosionNumber < this.NUMBER_OF_EXPLOSION_SPRITES) {
                this.image = this.game.images['explosion' + explosionNumber];
                this.size = this.originalSize.scale(this.EXPLOSION_MAX_SCALE * Math.sqrt(framesSinceExploded / this.FRAMES_FOR_EXPLOSION));
                this.radius = this.originalRadius * this.EXPLOSION_MAX_SCALE * Math.sqrt(framesSinceExploded / this.FRAMES_FOR_EXPLOSION);
            }
            else {
                this.delete = true;
            }
        }
    }
    explode() {
        if (this.hasExploded)
            return;
        this.speed = Vector2.zero;
        this.hasExploded = true;
        this.frameExploded = this.game.frame;
    }
    receiveDamage() {
        // torpedoes have 1hp and explode when hitting something
        this.explode();
    }
    initialize(process) {
        this.process = process;
    }
}
