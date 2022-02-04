import Vector2 from "../helpers/Vector2.js";

import RenderedObject from "../renderedObject.js";
export default class WarpGate extends RenderedObject {
	/* Constructor params */
	destinationSolarSystem;
	/* Default Attributes */
	ctx = "planets";
	size = new Vector2(5, 5);
	radius = 1.5;
	gravitySignature = 1;
	/* Other attributes */
	process;

	constructor(destinationSolarystem, ...args) {
		super(...args);
		this.image = this.game.images["warpgate"];
		this.destinationSolarSystem = destinationSolarystem;
	}
	initialize(process) {
		this.process = process;
	}
	warp(ship){
		let newProcess;
		this.game.processes.forEach((process) => {
			if (process.solarSystem.name === this.destinationSolarSystem) {
				newProcess = process;
			}
		})
		ship.solarSystem = newProcess.solarSystem;
		newProcess.appendShip(ship);
		ship.process.dealocateShip(ship);
		if (ship.primary) {
			this.game.drawnProcess = newProcess;
			newProcess.rerenderStatic();
		}
		ship.process = newProcess;
	}
}
