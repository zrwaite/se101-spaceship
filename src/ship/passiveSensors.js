import PassiveSensorReading from "./passiveSensorReading.js";
import response from "../helpers/response.js";

export default class PassiveSensors{
    constructor(parentShip){
		this.parentShip = parentShip;
	}
	generatePassiveSensorReadings(){
        // Ensure solar system is initialized before performing scan
        if (!this.parentShip.solarSystem) return new response(400, ["Cannot perform PassiveSensors generatePassiveSensorReadings until solar system initalized"], []);
        let readings = []; 
        for (const planet of this.parentShip.solarSystem.planets){
            let angle = planet.pos.angleTo(this.parentShip.pos);    
            let newReading = new PassiveSensorReading(angle, planet.gravitySignature);
            readings.push(newReading);
        }

        for (const warpgate of this.parentShip.solarSystem.warpGates){
            let angle = warpgate.pos.angleTo(this.parentShip.pos);
            let newReading = new PassiveSensorReading(angle, warpgate.gravitySignature);
            readings.push(newReading);
        }

        return new response(200, [], readings, true);
	}
}