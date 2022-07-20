import RenderedObject from '../renderedObject.js';
import Vector2 from '../helpers/Vector2.js';
export default class Planet extends RenderedObject {
    constructor(planetName, radius, composition, ...args) {
        super(...args);
        this.ctx = 'planets';
        /* Other attributes */
        this.process = null;
        this.image = this.game.images[planetName] || this.game.images['planet1'];
        this.name = planetName;
        this.composition = composition;
        this.mass = (Math.PI * radius * radius * radius) / 10;
        this.size = new Vector2(radius * 3, radius * 3);
        this.radius = radius;
    }
    initialize(process) {
        this.process = process;
    }
}
