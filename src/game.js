import Controller from "./controller.js";
import Galaxy from "./galaxy.js";
import {buildShip} from "./ships/buildShip.js"

export default class Game {
    constructor(width, height, ctxList){
		this.width = width;
        this.height = height;
		this.ctxList = ctxList;
        this.inputs; // Controller values
		this.drawnObjects = []; //stores objects that always need to be drawn and updated
		this.hiddenObjects = []; //stores objects that need to be update only
		this.delObjects = []; //Stores objects that need to be drawn and updated until deleted
		this.numShips; //Stores the number of ships that are rendered
		this.ships = []; //Array of ship objects
		this.galaxy; //Stores Galaxy Object
		this.solarSystem; //Stores Solar System Info
		this.watchShip; //Ship being watched
		this.watchShipName;
    }
    start(galaxyName, numShips, watchShipName) {
		this.numShips = numShips; 
		this.watchShipName = watchShipName; 
        this.inputs = new Controller(this); //controller created
		this.galaxy = new Galaxy(galaxyName); //Create galaxy
		this.solarSystem = this.galaxy.startingSolarSystem; //Starting solatsystem from galaxy
		this.newSolarSystem(this.solarSystem, numShips); //another version of start function basically
    }
	newSolarSystem(solarSystemName, numShips){
		let startPosition = new Vector2(0,0); //start at centre for now
		if (numShips > 1){
			this.ships.push(...buildShip("all", startPosition, this)); //Build all ships for now
			//get watchship by name in this.ships list
		} else {
			this.ships.push(buildShip(this.watchShipName, startPosition, this)) //build a single ship
			this.watchShip = this.ships[0];
		}
		this.solarSystem = this.galaxy.getSolarSystem(solarSystemName); 
		this.delObjects = [...this.solarSystem.asteroids] //Asteroids get deleted
		this.drawnObjects = [...this.solarSystem.warpGates, ...this.solarSystem.planets] //Warpgates and planets get drawn
		this.hiddenObjects = [...this.asteroidLaunchers]; //Launchers are hidden
	}
    update(deltaTime) {
		[...this.drawnObjects, ...this.delObjects, this.hiddenObjects].forEach((object) =>object.update(deltaTime));//Updates all objects
		this.delObjects=this.delObjects.filter(this.deleter) //Removes objects no longer needed
    }
    draw(){
        [...this.drawnObjects, ...this.delObjects].forEach(object => object.draw()); //Draws all drawn objects
    }
	deleter(sprite){ //Deletes objects from deletable array that aren't needed
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