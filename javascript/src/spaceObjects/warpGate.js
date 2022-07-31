import Vector2 from '../helpers/Vector2.js';
import Sprite from '../sprite.js';
import { keepInMap } from '../helpers/pos.js';
import { withinPiRange } from '../helpers/Angles.js';
export default class WarpGate extends Sprite {
    constructor(destinationSolarystem, ...args) {
        super(...args);
        /* Default Attributes */
        this.ctx = 'planets';
        this.size = new Vector2(50, 50);
        this.radius = 15;
        this.mass = 100;
        this.fourthDimension = false;
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
    update() {
        if (this.fourthDimension) {
            this.angle += Math.random();
            this.accel = Vector2.right.rotateTo(this.angle).scale(0.1);
            if (keepInMap(this.pos)) {
                this.angle = withinPiRange(new Vector2(360, 270).angleToPoint(this.pos));
                this.speed = Vector2.zero;
            }
        }
        super.update();
    }
}
