import Vector2 from '../helpers/Vector2.js';
import Sprite from '../sprite.js';
export default class BlackHole extends Sprite {
    constructor(...args) {
        super(...args);
        this.ctx = 'planets';
        this.radius = 40;
        this.orbitingPlanets = [];
        /* Other attributes */
        this.process = null;
        this.image = this.game.images['blackhole'];
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
    update() {
        if (!this.process)
            return;
    }
}
