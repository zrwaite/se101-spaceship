import Vector2 from '../helpers/Vector2.js';
import Sprite from '../sprite.js';
import Torpedo from '../ship/torpedo.js';
export default class Star extends Sprite {
    constructor(...args) {
        super(...args);
        this.ctx = 'planets';
        this.initialRadius = 40;
        this.radius = 50 + (Math.random() - 0.5) * 5;
        this.orbitingPlanets = [];
        this.collapseCountdown = 0;
        this.collapsing = false;
        /* Other attributes */
        this.process = null;
        this.image = this.game.images['star'];
        this.mass = (Math.PI * this.radius * this.radius * this.radius) / 10;
        this.calcSize();
    }
    initialize(process) {
        this.process = process;
    }
    calcSize() {
        this.size = new Vector2(this.radius * 3, this.radius * 3);
    }
    addPlanet(planet) {
        this.orbitingPlanets.push(planet);
    }
    collapse(after) {
        this.collapsing = true;
        this.collapseCountdown = 500 + after;
    }
    update() {
        if (!this.process)
            return;
        if (this.collapsing) {
            if (this.collapseCountdown <= 0) {
                this.delete = true;
                const explosion = new Torpedo(Vector2.zero, this.pos, this.game);
                explosion.FRAMES_FOR_EXPLOSION = 162;
                explosion.EXPLOSION_MAX_SCALE = 30;
                explosion.explode();
                this.process.spawnDeletableObject(explosion);
                this.orbitingPlanets.forEach(planet => planet.leaveOrbit());
                return;
            }
            else if (this.collapseCountdown <= 500) {
                this.radius = this.initialRadius * (-Math.pow(-this.collapseCountdown + 500, 5) / Math.pow(500, 5) + 1);
                this.calcSize();
            }
            this.collapseCountdown--;
        }
    }
}
