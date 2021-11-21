import Vector2 from "./helpers/Vector2.js";
import Controller from "./controller.js";
import Galaxy from "./galaxy.js";
import {buildShip} from "./ship/buildShip.js"

import Asteroid from "./spaceObjects/asteroid.js";
import Torpedo from "./ship/torpedo.js";

export default class Game {
    constructor(width, height, images, contexts) {
		this.width = width;
        this.height = height;
        this.images = images;
		this.contexts = contexts;
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

        // Animation Elements (UI uses these too)
        this.initializing = 1; // goes to 0 once everything has been drawn once
        this.zoom = 1; // zoomed-out --> 1; zoomed-in --> 3;

        this.frame = 0; // this increments every frame
        this.paused = false; // If the whole game is paused
        this.unit; // Global Unit
        this.fpsInterval = 1000 / 60;
    }
    start(galaxyName, numShips, watchShipName) {
		this.numShips = numShips;
		this.watchShipName = watchShipName;
        this.inputs = new Controller(this); //controller created
		this.galaxy = new Galaxy(galaxyName, this); //Create galaxy
		this.solarSystem = this.galaxy.startingSolarSystem; //Starting solar system from galaxy
		this.newSolarSystem(this.solarSystem, numShips); //Another version of start function basically
		this.delObjects.forEach((object) => object = null); //Clears delete-able objects
        this.draw();
        this.update();
        this.initializing = false; // DONE STARTING
    }
	newSolarSystem(solarSystemName, numShips){
		let startPosition = new Vector2(30,30); //start at centre for now
		if (numShips > 1){
			this.ships.push(...buildShip("all", startPosition, this)); //Build all ships for now
			//get watchship by name in this.ships list
		} else {
			this.ships.push(buildShip(this.watchShipName, startPosition, this)) //build a single ship
			this.watchShip = this.ships[0];
		}
		this.solarSystem = this.galaxy.getSolarSystem(solarSystemName); 
		this.delObjects = [...this.solarSystem.asteroids]; //Asteroids get deleted
		this.drawnObjects = [...this.solarSystem.warpGates, ...this.solarSystem.planets, ...this.ships]; //Warpgates and planets get drawn
		this.hiddenObjects = [...this.solarSystem.asteroidLaunchers]; //Launchers are hidden
	}
	// add deletable game object (missles/asteroids) to the list
	spawnDeletableObject(obj) {
		this.delObjects.push(obj);
	}
	// check if two Sprites overlaps with each other
	ifCollide(obj1, obj2) {
		const xDiff = obj1.pos.x-obj2.pos.x;
		const yDiff = obj1.pos.y-obj2.pos.y;
		const rTotal = obj1.radius + obj2.radius;
		return xDiff*xDiff + yDiff*yDiff < rTotal*rTotal;
	}

	// METHOD 1, simple O(n^2), check every pair for collision
	detectCollisions() {
		// console.log('aisgdkagsd')
		// check ships with 
		this.ships.forEach((ship, i) => {
			this.delObjects.forEach((a, i) => {
				// asdasd
				if (a instanceof(Asteroid) && this.ifCollide(ship, a)) {
					console.log('asdasdas');
				}
				else if (a instanceof(Torpedo) && this.ifCollide(ship, a)) {
					console.log('yoyyoy')
				}
				// check if
			})
		});
	}

	update () {
        let game = this;

		this.detectCollisions();

		this.delObjects = this.delObjects.filter(this.deleter); //Removes objects no longer needed

        ["missiles", "planets", "objects", "thrusters", "ships", "items"].forEach((object) => {
            if (object !== "planets" || game.zoom !== 1) {
                game.contexts[object].setTransform(1, 0, 0, 1, 0, 0);
                game.contexts[object].clearRect(0, 0, game.width * game.unit, game.height * game.unit);
            }
        });
		[...this.drawnObjects, ...this.delObjects, ...this.hiddenObjects].forEach((object) => object.update()); //Updates all objects
        
        this.frame++;
    }
    draw () {
        let game = this;
        [...game.drawnObjects, ...game.delObjects].forEach((object) => {
            // Doesn't draw if zoomed out (game.zoom == 1) and planet :)
            if (!(object.ctx === "planets") || game.zoom !== 1 || game.initializing) object.draw();
        }); //Draws all drawn objects
    }
	deleter(sprite){ //Deletes objects from deletable array that aren't needed
		if(sprite.delete) return false;
		return true;
	}
	collide(obj1, obj2){
		/* METHOD 1, simple n^2, check every pair of objects for collision */

		
		/*
        Physics and collision detection function for 
		detemining the collision between every relevant set
		of objects; will be tricky to make, but very worth it!
        Consult Zac or Josiah if you need info on how this
        function will be used.
		*/
	}
}