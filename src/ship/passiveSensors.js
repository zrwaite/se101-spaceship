import Vector2 from "../helpers/Vector2.js";
import PassiveSensorReading from "./passiveSensorReading.js";
export default class PassiveSensors{
    constructor(parentShip){
		this.parentShip = parentShip;
	}
	generatePassiveSensorReadings(){
        if (!this.parentShip.solarSystem) return;
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

        return readings;
	}
}