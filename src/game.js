import Controller from "./controller.js";
import Galaxy from "./galaxy.js";
import {buildShip} from "./ships/buildShip.js"

export default class Game {
    constructor(width, height){
		this.width = width;
        this.height = height;
        this.inputs = [];
		this.drawnObjects = [];
		this.hiddenObjects = [];
		this.delObjects = [];
		this.numShips = 16;
		this.ships = [];
		this.galaxy; //Stores Galaxy Object
		this.solarSystem; //Stores Solar System Info
		this.watchShip;
    }
    start(galaxyName, numShips, watchShipName) {
		this.numShips = numShips;
		this.watchShipName = watchShipName; 
        this.inputs = new Controller(this);
		this.galaxy = new Galaxy(galaxyName);
		this.solarSystem = this.galaxy.startingSolarSystem;
		this.newSolarSystem(this.solarSystem, numShips);
    }
	newSolarSystem(solarSystemName, numShips){
		if (numShips > 1){
			this.ships.push(...buildShip("all", startPosition, this));
			//get watchship by name in this.ships list
		} else {
			let startPosition = new Vector2(0,0);
			this.ships.push(buildShip(this.watchShipName, startPosition, this))
			this.watchShip = this.ships[0];
		}
		this.solarSystem = this.galaxy.getSolarSystem(solarSystemName);
		this.drawnObjects = [...this.solarSystem.asteroids, ...this.solarSystem.warpGates, ...this.solarSystem.planets]
		this.hiddenObjects = [...this.asteroidLaunchers];
	}
    update(deltaTime) {
		[...this.drawnObjects, ...this.delObjects, this.hiddenObjects].forEach((object) =>object.update(deltaTime));//Updates all objects
		this.delObjects=this.delObjects.filter(this.deleter) //Removes objects no longer needed
    }
    draw(ctx){
        [...this.drawnObjects, ...this.delObjects].forEach(object => object.draw(ctx));
    }
	deleter(sprite){
		if(sprite.delete) return false;
		return true;
	}
	collide(obj1, obj2){
		/* Physics and collision detection function for 
		detemining the collision between every relevant set
		of objects
		*/
	}
}