import RenderedObject from "../renderedObject.js";
import Vector2 from "../helpers/Vector2.js";
export default class Planet extends RenderedObject {
    constructor(planetName, composition, ...args) {
        super(...args);
        /* Default Params */
        this.gravitySignature = 2;
        this.size = new Vector2(5, 5);
        this.radius = 1.5;
        this.ctx = "planets";
        /* Other attributes */
        this.process = null;
        this.image = this.game.images[planetName] || this.game.images["planet1"];
        this.name = planetName;
        this.composition = composition;
    }
    initialize(process) {
        this.process = process;
    }
}
