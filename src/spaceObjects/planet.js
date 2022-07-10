import RenderedObject from '../renderedObject.js';
import Vector2 from '../helpers/Vector2.js';
export default class Planet extends RenderedObject {
    constructor(planetName, mass, composition, ...args) {
        super(...args);
        this.size = new Vector2(50, 50);
        this.radius = 15;
        this.ctx = 'planets';
        /* Other attributes */
        this.process = null;
        this.image = this.game.images[planetName] || this.game.images['planet1'];
        this.name = planetName;
        this.composition = composition;
        this.mass = mass;
    }
    initialize(process) {
        this.process = process;
    }
}
