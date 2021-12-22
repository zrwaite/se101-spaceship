import EMSReading from "./EMSReading.js";
import response from "../helpers/response.js";

export default class ActiveSensors{
    constructor(parentShip){
		this.parentShip = parentShip;
	}

	performScan(heading, arc, range){
        // Ensure solar system is initialized before performing scan
        if (!this.parentShip.solarSystem) return new response(400, ["Cannot perform ActiveSensors performScan until solar system initalized"], []);
        //User called function for getting sensor data
        let readings = [];
        for (const planet of this.parentShip.solarSystem.planets){

            let dist = planet.pos.distance(this.parentShip.pos);
            let angle = planet.pos.angleTo(this.parentShip.pos);
            if (dist+planet.size.x<=range && angle>= -heading && angle<= -heading+arc){
                let newReading = new EMSReading(angle, dist, 0, planet.size.x, planet.composition, null); //?
                readings.push(newReading);
            }
        }

        for (const warpgate of this.parentShip.solarSystem.warpGates){
            let dist = warpgate.pos.distance(this.parentShip.pos);
            let angle = warpgate.pos.angleTo(this.parentShip.pos);
            if (dist+warpgate.size.x<=range && angle>= -heading && angle<= -heading+arc){
                let newReading = new EMSReading(angle, dist, 0, warpgate.width, null, warpgate.destinationSolarSystem); //?
                readings.push(newReading);
            }
        }

        for (const asteroid of this.parentShip.solarSystem.asteroids){
            let dist = asteroid.pos.distance(this.parentShip.pos);
            let angle = asteroid.pos.angleTo(this.parentShip.pos);
            if (dist+asteroid.size.x<=range && angle>= -heading && angle<= -heading+arc){
                let newReading = new EMSReading(angle, dist, asteroid.speed, asteroid.radius, null, null); //?
                readings.push(newReading);
            }
        }
        return new response(200, [], readings, true);
	}
}