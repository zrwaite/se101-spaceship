import Vector2 from "./helpers/Vector2.js";
import Controller from "./controller.js";
import Galaxy from "./galaxy.js";
import {buildShip} from "./ship/buildShip.js";
import Process from "./gameProcess.js";
import Asteroid from "./spaceObjects/asteroid.js";
import Torpedo from "./ship/torpedo.js";
import Meteor from "./spaceObjects/meteor.js";
import Matrix2 from "./helpers/Matrix2.js";

const DMG_COEFFICIENT = 20;

export default class Game {
	unit;
    constructor(width, height, images, contexts) {
		this.width = width; // in units
        this.height = height; // in units
        this.images = images;
		this.contexts = contexts;
        this.inputs; // Controller values
		this.drawnObjects = []; // stores objects that always need to be drawn and updated
		this.hiddenObjects = []; // stores objects that need to be update only
		this.delObjects = []; // Stores objects that need to be drawn and updated until deleted
		this.allShips; // Stores the number of ships that are rendered
		this.ships = []; // Array of ship objects
		this.galaxy; // Stores Galaxy Object
		this.solarSystem; // Stores Solar System Info
		this.watchShip; // Ship being watched
		this.watchShipName;

        // Animation Elements (UI uses these too)
        this.initializing = 1; // goes to 0 once everything has been drawn once
        this.zoom = 1; // zoomed-out --> 1; zoomed-in --> any other number; standard: 2.5;
        // --- The rendered width is:   (Math.floor(this.width / this.zoom) * this.unit);
        this.camera = new Vector2(0, 0); // pixels from top-left
        
        this.frame = 0; // this increments every frame
        this.paused = false; // If the whole game is paused
        this.unit; // Global Unit
        this.fpsInterval = 1000 / 60;
		this.solarSystemName;
		this.processes = [];
    }
    start(galaxyName, allShips, watchShipName) {
		this.allShips = allShips
		let startPosition = new Vector2(30,30); //start at centre for now
		this.watchShipName = watchShipName;
        this.inputs = new Controller(this); //controller created
		this.galaxy = new Galaxy(galaxyName, this); //Create galaxy
		this.solarSystemName = this.galaxy.startingSolarSystem; //Starting solar system from galaxy
		let processIndex = 0;
		this.galaxy.solarSystems.forEach((solarSystem) => {
			this.processes.push(new Process(this, solarSystem, processIndex));
			processIndex++;
		})

		this.drawnProcess = this.processes[0];

		if (this.allShips) {
			this.ships.push(...buildShip("all", startPosition, this, this.drawnProcess)); //Build all ships for now
			let shipFound = false;
			for (let i=0; i<this.ships.length; i++) {
				if (this.ships[i].name === watchShipName) {
					this.watchShip = this.ships[i];
					shipFound = true;
					break;
				}
			}
			if (!shipFound) alert("shipName " + watchShipName + " not found");
			else console.log(this.watchShip);
		} else {
			this.ships.push(buildShip(this.watchShipName, startPosition, this, this.drawnProcess)) //build a single ship
			this.watchShip = this.ships[0];
			if (!this.watchShip) console.error("Invalid ship name");
		}
		this.watchShip.primary = true;
		this.ships.forEach((ship)=> {
			this.drawnObjects.push(ship.turretControls);
			ship.turretControls.ctx = "ships";
		})

		this.processes.forEach((process) => {
			if (process.solarSystem.name === this.solarSystemName) {
				process.start(this.ships, this.watchShip);
				process.rerenderStatic();
			} else {
				process.start([], null);
			}
		})


		

		// this.newSolarSystem(this.solarSystem); //Another version of start function basically
        this.draw();
        this.update();
        this.initializing = false; // DONE STARTING
		//console.log(this.watchShip);
    }
	newSolarSystem(solarSystemName){
		this.solarSystemName = solarSystemName;
		let startPosition = new Vector2(30,30); //start at centre for now
        this.solarSystem = this.galaxy.getSolarSystem(solarSystemName); 
		this.ships.forEach((ship) => ship.pos = startPosition);
		// let objectsList = [...this.delObjects, ...this.drawnObjects, ...this.hiddenObjects];
		// for (let i=0; i<objectsList.length; i++) delete objectsList[i];
		this.delObjects = [...this.solarSystem.asteroids]; //Asteroids get deleted
		this.drawnObjects = [...this.solarSystem.warpGates, ...this.solarSystem.planets, ...this.ships]; //Warpgates and planets get drawn
		this.hiddenObjects = [...this.solarSystem.asteroidLaunchers]; //Launchers are hidden
		this.rerenderStatic();
	}
	// check if two Sprites overlaps with each other
	ifCollide(obj1, obj2) {
		const xDiff = obj1.pos.x-obj2.pos.x;
		const yDiff = obj1.pos.y-obj2.pos.y;
		const rTotal = obj1.radius + obj2.radius;
		return xDiff * xDiff + yDiff * yDiff < rTotal * rTotal;
	}
	// two objects hit each other, handle perfectly elastic collision
	// returns the velocity difference (in the norm direction) between the 2 objects 
	// used to calculate dmg take if ship clanks with asteroid/meteor
	clank(obj1, obj2) {
		const norm = (new Vector2(obj1.pos.x-obj2.pos.x, obj1.pos.y-obj2.pos.y)).normalize();
		// When meteorites spawn, they start off right on top of each other
		// clanking does not really make sense of objects right on top of one another
		if (norm.x === 0 && norm.y === 0) { return; }
		const tan = norm.matrixMultiply(Matrix2.Rotate90CCW);
		const basisMatrix = Matrix2.MakeBasisMatrix(norm, tan);
		const basisMatrixInverse = basisMatrix.inverse();
		// the speeds are broken down into the norm/tan components
		// x represents the norm velocity and y represednts the tan velocity
		const obj1SpeedComponents = obj1.speed.matrixMultiply(basisMatrixInverse);
		const obj2SpeedComponents = obj2.speed.matrixMultiply(basisMatrixInverse);
		// the head on (norm) velocity determines how much dmg each object would take upon clank
		const headOnVelocityDiff = (obj1SpeedComponents.x - obj2SpeedComponents.x)
		// the tangiential velocities do no affect the collision tragetory
		// now we can treat this as a 1d elastic collision along the norm axis
		const D = 1/(obj1.mass + obj2.mass);
		const obj1NormSpeedNew = (obj1.mass-obj2.mass)*D*obj1SpeedComponents.x + (2*obj2.mass)*D*obj2SpeedComponents.x
		const obj2NormSpeedNew = (obj2.mass-obj1.mass)*D*obj2SpeedComponents.x + (2*obj1.mass)*D*obj1SpeedComponents.x
		obj1SpeedComponents.x = obj1NormSpeedNew;
		obj2SpeedComponents.x = obj2NormSpeedNew;
		// change the base back to x and y components
		const obj1SpeedNew = obj1SpeedComponents.matrixMultiply(basisMatrix);
		const obj2SpeedNew = obj2SpeedComponents.matrixMultiply(basisMatrix);
		obj1.speed = obj1SpeedNew;
		obj2.speed = obj2SpeedNew;
		return headOnVelocityDiff;
	}

	// METHOD 1, simple O(n^2), check every pair for collision

	detectProcessCollisions(process) {
		// check ships collided with anything
		process.ships.forEach((ship) => {
			process.delObjects.forEach((obj) => {
				if (this.ifCollide(ship, obj)) {
					if (obj instanceof(Asteroid) || obj instanceof(Meteor)) {
						const vDiff = this.clank(ship, obj);
						// when ships hit anything, they receive dmg
						// we say the dmg recieved is propotional to the square of the velocity difference
						const dmg = DMG_COEFFICIENT*vDiff*vDiff;
						ship.receiveDamage(dmg);
					}
					// here we can test if ship hits torpedo and all that such
					// else if (obj instanceof(Torpedo)) { console.log('Ship hit Torpedo')}
				}
			})
		});

		for (let i=0; i<process.delObjects.length; i++) {
			for (let j=i+1; j<process.delObjects.length; j++) {
				const a = process.delObjects[i];
				const b = process.delObjects[j];
				if (this.ifCollide(a, b)) {
					if (a instanceof(Torpedo) || b instanceof(Torpedo)) {
						// torpedos can hit each other for now but firing from multiple
						// tubes at once instantly explodes all torpedos fired at that time
						// if (a instanceof(Torpedo) && b instanceof(Torpedo)) {
						// 	continue;
						// }
						a.receiveDamage();
						b.receiveDamage();
					} else {
						this.clank(a, b)
					}
				}
			}
		}
	}

	update () {
		this.processes.forEach(process => process.update())

		// this.detectCollisions();

		// this.delObjects = this.delObjects.filter(this.deleter); // Removes objects no longer needed

        //let camOffset = new Vector2(-this.watchShip.speed.x * this.unit * this.dragConst, -this.watchShip.speed.y * this.unit * this.dragConst);
        let candidateX = (this.watchShip.pos.x - this.width / this.zoom / 2) * this.unit;
        let candidateY = (this.watchShip.pos.y - this.height / this.zoom / 2) * this.unit;
        candidateX = (candidateX <= 0) ? 0 : ((candidateX / this.unit <= this.width - this.width / this.zoom) ? candidateX : (this.width - this.width / this.zoom) * this.unit);
        candidateY = (candidateY <= 0) ? 0 : ((candidateY / this.unit <= this.height - this.height / this.zoom) ? candidateY : (this.height - this.height / this.zoom) * this.unit);
        
        this.camera.x = candidateX;
        this.camera.y = candidateY;

        
        // Temporary drawing of the zoomed-in view
        /*let ctx = game.contexts["items"];
        ctx.lineWidth = "5";
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.rect(this.camera.x, this.camera.y, Math.floor(this.width / this.zoom * this.unit), Math.floor(this.height / this.zoom * this.unit));
        ctx.stroke();*/

		// [...this.drawnObjects, ...this.delObjects, ...this.hiddenObjects].forEach((object) => object.update()); //Updates all objects

        this.frame++;
    }
    draw () {
		this.drawnProcess.draw();
    }
	deleter(sprite){ //Deletes objects from deletable array that aren't needed
		return !sprite.delete
	}
    endGame() {
        let game = this;
        ["missiles", "planets", "objects", "thrusters", "ships", "items"].forEach((object) => {
            game.contexts[object].setTransform(1, 0, 0, 1, 0, 0);
            game.contexts[object].clearRect(0, 0, game.width * game.unit, game.height * game.unit);
        });
		delete game.contexts;
        delete game.inputs;
		delete game.drawnObjects;
		delete game.hiddenObjects;
		delete game.delObjects;
		delete game.ships;
		delete game.galaxy;
		delete game.solarSystem;
		delete game.watchShip;
        delete game.camera;
		game.processes.forEach((process) => {
			process.endProcess();
		})
		delete game.processes;
    }
}