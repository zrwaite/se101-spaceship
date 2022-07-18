import PassiveSensorReading from './passiveSensorReading.js';
import APIResponse from '../helpers/response.js';
export default class PassiveSensors {
    constructor(parentShip) {
        this.parentShip = parentShip;
    }
    scan() {
        // Ensure solar system is initialized before performing scan
        if (!this.parentShip.solarSystem)
            return new APIResponse(400, ['Cannot perform PassiveSensors scan until solar system initialized'], []);
        // Note: angle must account for relative position of object to ship (not global position on board)
        // To find angle, find angle difference between the vector from ship to object & current ship heading
        // y coordinate is inverted due to the flipped board axis (greater y value indicates lower position)
        let readings = [];
        for (const planet of this.parentShip.solarSystem.planets) {
            let angle = planet.pos.angleToPoint(this.parentShip.pos);
            readings.push(new PassiveSensorReading(angle, planet.mass));
        }
        for (const warpgate of this.parentShip.solarSystem.warpGates) {
            let angle = warpgate.pos.angleToPoint(this.parentShip.pos);
            readings.push(new PassiveSensorReading(angle, warpgate.gravitySignature));
        }
        return new APIResponse(200, [], readings, true);
    }
}
