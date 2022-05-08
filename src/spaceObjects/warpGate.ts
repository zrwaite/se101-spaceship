import Vector2 from "../helpers/Vector2.js";

import RenderedObject from "../renderedObject.js";
import SolarSystem from "../solarSystem.js";
export default class WarpGate extends RenderedObject {
	/* Constructor params */
	destinationSolarSystem;
	/* Default Attributes */
	ctx = "planets";
	size = new Vector2(5, 5);
	radius = 1.5;
	gravitySignature = 1;
	/* Other attributes */
	process:any;

	constructor(destinationSolarystem:string, ...args:[pos:Vector2, game:any]) {
		super(...args);
		this.image = this.game.images["warpgate"];
		this.destinationSolarSystem = destinationSolarystem;
	}
	initialize(process:any) {
		this.process = process;
	}
	warp(ship:any){
		let newProcess:any;
		this.game.processes.forEach((process:any) => {
			if (process.solarSystem.name === this.destinationSolarSystem) {
				newProcess = process;
			}
		})
		if (newProcess) {
			ship.solarSystem = newProcess.solarSystem;
			newProcess.appendShip(ship);
			ship.process.dealocateShip(ship);
			if (ship.primary) {
				this.game.drawnProcess = newProcess;
				// newProcess.rerenderStatic();
			}
			ship.process = newProcess;
		}
	}
}
