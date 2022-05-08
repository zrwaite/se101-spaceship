import Vector2 from "../helpers/Vector2.js";
import RenderedObject from "../renderedObject.js";
export default class WarpGate extends RenderedObject {
    constructor(destinationSolarystem, ...args) {
        super(...args);
        /* Default Attributes */
        this.ctx = "planets";
        this.size = new Vector2(5, 5);
        this.radius = 1.5;
        this.gravitySignature = 1;
        this.image = this.game.images["warpgate"];
        this.destinationSolarSystem = destinationSolarystem;
    }
    initialize(process) {
        this.process = process;
    }
    warp(ship) {
        let newProcess;
        this.game.processes.forEach((process) => {
            if (process.solarSystem.name === this.destinationSolarSystem) {
                newProcess = process;
            }
        });
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
