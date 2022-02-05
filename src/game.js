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
	/* Constructor Params */
	width; //Ship Width
	height; 
	images;
	contexts;

	/* Default Attributes */
	ships = []; // Array of ship objects
	// Animation Elements (UI uses these too)
	initializing = 1; // goes to 0 once everything has been drawn once
	zoom = 1; // zoomed-out --> 1; zoomed-in --> any other number; standard: 2.5;
	// --- The rendered width is:   (Math.floor(this.width / this.zoom) * this.unit);
	camera = new Vector2(0, 0); // pixels from top-left
	frame = 0; // this increments every frame
	paused = false; // If the whole game is paused
	fpsInterval = 1000 / 60;
	processes = [];
	startPosition = new Vector2(30,30); //start at centre for now

	/* Other Attributes */
	unit; //Global Unit
	inputs;// Controller values
	allShips; // Stores the number of ships that are rendered
	galaxy; // Stores Galaxy Object
	watchShip; // Ship being watched
	watchShipName;
	solarSystemName;
	
	constructor(width, height, images, contexts) {
		this.width = width; // in units
        this.height = height; // in units
        this.images = images;
		this.contexts = contexts;
    }

    start(galaxyName, allShips, watchShipName) {
		this.allShips = allShips
		this.watchShipName = watchShipName;
		this.galaxy = new Galaxy(galaxyName, this); //Create galaxy

        this.inputs = new Controller(this); //controller created
		this.solarSystemName = this.galaxy.startingSolarSystem; //Starting solar system from galaxy

		this.galaxy.solarSystems.forEach((solarSystem, i) => {
			this.processes.push(new Process(this, solarSystem, i));
		})
		this.drawnProcess = this.processes[0];

		if (this.allShips) {
			this.ships.push(...buildShip("all", this.startPosition, this, this.drawnProcess)); //Build all ships for now
			for (let i=0; i<this.ships.length; i++) {
				if (this.ships[i].name === watchShipName) {
					this.watchShip = this.ships[i];
					break;
				}
			}
		} else {
			this.ships.push(buildShip(this.watchShipName, this.startPosition, this, this.drawnProcess)) //build a single ship
			this.watchShip = this.ships[0];
		}
		this.watchShip.primary = true;

		this.processes.forEach((process) => {
			if (process.solarSystem.name === this.solarSystemName) 
				process.start(this.ships, this.watchShip);
			else process.start([], null);
		});
        this.initializing = false; // DONE STARTING
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
		// x represents the norm velocity and y represents the tan velocity
		const obj1SpeedComponents = obj1.speed.matrixMultiply(basisMatrixInverse);
		const obj2SpeedComponents = obj2.speed.matrixMultiply(basisMatrixInverse);
		// the head on (norm) velocity determines how much dmg each object would take upon clank
		const headOnVelocityDiff = (obj1SpeedComponents.x - obj2SpeedComponents.x)
		// the tangential velocities do not affect the collision trajectory
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
						// we say the dmg received is proportional to the square of the velocity difference
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
					if (a instanceof(Torpedo) || b instanceof(Torpedo)) { // XOR
						if (a instanceof(Torpedo) && b instanceof(Torpedo)) continue;
						if (a.hasExploded || b.hasExploded) continue;
						// torpedoes can hit each other for now but firing from multiple
						// tubes at once instantly explodes all torpedoes fired at that time
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
        //let camOffset = new Vector2(-this.watchShip.speed.x * this.unit * this.dragConst, -this.watchShip.speed.y * this.unit * this.dragConst);
        let candidateX = (this.watchShip.pos.x - this.width / this.zoom / 2) * this.unit;
        let candidateY = (this.watchShip.pos.y - this.height / this.zoom / 2) * this.unit;
        candidateX = (candidateX <= 0) ? 0 : ((candidateX / this.unit <= this.width - this.width / this.zoom) ? candidateX : (this.width - this.width / this.zoom) * this.unit);
        candidateY = (candidateY <= 0) ? 0 : ((candidateY / this.unit <= this.height - this.height / this.zoom) ? candidateY : (this.height - this.height / this.zoom) * this.unit);
        this.camera.x = candidateX;
        this.camera.y = candidateY;
        this.frame++;
    }
    draw () {this.drawnProcess.draw();}
    endGame() {
        let game = this;
        ["missiles", "planets", "objects", "thrusters", "ships", "items"].forEach((object) => {
            game.contexts[object].setTransform(1, 0, 0, 1, 0, 0);
            game.contexts[object].clearRect(0, 0, game.width * game.unit, game.height * game.unit);
        });
		delete game.contexts;
        delete game.inputs;
		delete game.ships;
		delete game.galaxy;
		delete game.watchShip;
        delete game.camera;
		game.processes.forEach(process => process.endProcess());
		delete game.processes;
    }
}

/* Previous update */
        
// Temporary drawing of the zoomed-in view
/*let ctx = game.contexts["items"];
ctx.lineWidth = "5";
ctx.strokeStyle = "red";
ctx.beginPath();
ctx.rect(this.camera.x, this.camera.y, Math.floor(this.width / this.zoom * this.unit), Math.floor(this.height / this.zoom * this.unit));
ctx.stroke();*/