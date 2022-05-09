import RenderedObject from "../renderedObject.js";
import Vector2 from "../helpers/Vector2.js";
import PlanetComposition from "./planetComposition.js";
import Process from "../gameProcess.js";
import Game from "../game.js";

export default class Planet extends RenderedObject {
	/* Default Params */
	gravitySignature = 2;
	size = new Vector2(5, 5);
	radius = 1.5;
	ctx = "planets";
	name:string;

	/* Other attributes */
	process:Process|null = null;
	composition;
	constructor(planetName:string, composition:PlanetComposition, ...args:[pos:Vector2, game:Game]) {
		super(...args);
		this.image = this.game.images[planetName] || this.game.images["planet1"];
		this.name = planetName;
		this.composition = composition;
	}
	initialize(process:Process) {
		this.process = process;
	}
}