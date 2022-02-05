import PassiveSensorReading from "./passiveSensorReading.js";
import response from "../helpers/response.js";
import Vector2 from "../helpers/Vector2.js";

export default class PassiveSensors{
    parentShip;
    constructor(parentShip){
		this.parentShip = parentShip;
	}
	generatePassiveSensorReadings(){
        // Ensure solar system is initialized before performing scan
        if (!this.parentShip.solarSystem) return new response(400, ["Cannot perform PassiveSensors generatePassiveSensorReadings until solar system initialized"], []);

        // Note: angle must account for relative position of object to ship (not global position on board)
        // To find angle, find angle difference between the vector from ship to object & current ship heading
        // y coordinate is inverted due to the flipped board axis (greater y value indicates lower position)
        let readings = []; 
        for (const planet of this.parentShip.solarSystem.planets){
            let angle = this.parentShip.angle.angleTo(new Vector2(planet.pos.x - this.parentShip.pos.x, this.parentShip.pos.y - planet.pos.y));
            let newReading = new PassiveSensorReading(angle, planet.gravitySignature);
            readings.push(newReading);
        }

        for (const warpgate of this.parentShip.solarSystem.warpGates){
            let angle = this.parentShip.angle.angleTo(new Vector2(warpgate.pos.x - this.parentShip.pos.x, this.parentShip.pos.y - warpgate.pos.y));
            let newReading = new PassiveSensorReading(angle, warpgate.gravitySignature);
            readings.push(newReading);
        }

        return new response(200, [], readings, true);
	}
}