import Vector2 from '../helpers/Vector2.js';
import RenderedObject from '../renderedObject.js';
export default class WarpGate extends RenderedObject {
    constructor(destinationSolarystem, ...args) {
        super(...args);
        /* Default Attributes */
        this.ctx = 'planets';
        this.size = new Vector2(50, 50);
        this.radius = 15;
        this.mass = 5;
        this.gravity = 100;
        /* Other attributes */
        this.process = null;
        this.image = this.game.images['warpgate'];
        this.destinationSolarSystem = destinationSolarystem;
    }
    initialize(process) {
        this.process = process;
    }
    warp(ship) {
        let newProcess = this.game.processes.find((process) => process.solarSystem.name === this.destinationSolarSystem);
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
        else
            throw Error('Process not found');
    }
}
