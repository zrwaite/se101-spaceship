import Vector2 from "./helpers/Vector2.js";

export default class Process {
	/* Constructor Params */
	game;
	solarSystem;
	index;
	width;
	height;
	images;
	contexts;

	/* Default Attributes */
	drawnObjects = []; // stores objects that always need to be drawn and updated
	hiddenObjects = []; // stores objects that need to be update only
	delObjects = []; // Stores objects that need to be drawn and updated until deleted
	ships = []; // Array of ship objects
	// Animation Elements (UI uses these too)
	// --- The rendered width is:   (Math.floor(this.width / this.zoom) * this.unit);
	frame = 0; // this increments every frame
	paused = false; // If the whole game is paused

	/* Other Attributes */
	allShips; // Stores the number of ships that are rendered
	watchShip; // Ship being watched
	unit; // Global Unit
	
	constructor(game, solarSystem, index) {
		this.game = game;
		this.solarSystem = solarSystem
		this.index = index;
		this.width = this.game.width; // in units
        this.height = this.game.height; // in units
        this.images = this.game.images;
		this.contexts = this.game.contexts;
    }
    start(ships, watchShip) {
		this.ships = ships;
		this.watchShip = watchShip;
		let startPosition = new Vector2(30,30); //start at centre for now
		this.ships.forEach((ship) => ship.pos = startPosition);
		let objectsList = [...this.delObjects, ...this.drawnObjects, ...this.hiddenObjects];
		for (let i=0; i<objectsList.length; i++) delete objectsList[i];
		this.delObjects = [...this.solarSystem.asteroids]; //Asteroids get deleted
		this.drawnObjects = [...this.ships]; //Warpgates and planets get drawn
		this.staticObjects = [...this.solarSystem.warpGates, ...this.solarSystem.planets];
		this.hiddenObjects = [...this.solarSystem.asteroidLaunchers]; //Launchers are hidden
		[...this.delObjects, ...this.solarSystem.warpGates, ...this.solarSystem.planets, ...this.hiddenObjects].forEach((object) => {
			object.initialize(this);
		});
        this.draw();
        this.update();
        this.initializing = false; // DONE STARTING
    }
	appendShip(ship) {
		this.ships.push(ship);
		this.drawnObjects.push(ship);
	}
	dealocateShip(ship) {
		let shipIndex;
		for (let i=0; i<this.ships.length; i++) {
			if (this.ships[i].name === ship.name) {
				shipIndex = i;
				break;
			}
		}
		this.ships.splice(shipIndex, 1);

		for (let i=0; i<this.drawnObjects.length; i++) {
			if (this.drawnObjects[i].name === ship.name) {
				shipIndex = i;
				break;
			}
		}
		this.drawnObjects.splice(shipIndex, 1);
	}
	spawnDeletableObject(obj) {
		this.delObjects.push(obj);
	}
	update () {
		if (this.ships.length === 0) return;
		this.game.detectProcessCollisions(this);
		this.delObjects = this.delObjects.filter(this.game.deleter); // Removes objects no longer needed

		[...this.drawnObjects, ...this.delObjects, ...this.hiddenObjects].forEach((object) => object.update()); //Updates all objects

        this.frame++;
    }
    draw () {
        [...this.drawnObjects, ...this.staticObjects, ...this.delObjects].forEach((object) => {
            //if (object.ctx !== "planets" || this.game.zoom !== 1 || this.initializing) {
                object.draw();
            //}
        }); //Draws all drawn objects
    }
	rerenderStatic() {
        document.getElementById("SolarSystemName").innerHTML = this.solarSystem.name;
		["missiles", "planets", "objects", "thrusters", "ships", "items"].forEach((object) => {
            this.contexts[object].setTransform(1, 0, 0, 1, 0, 0);
            this.contexts[object].clearRect(0, 0, this.width * this.unit, this.height * this.unit);
        });
		[...this.drawnObjects, ...this.staticObjects, ...this.delObjects].forEach((object) => object.draw()); //Redrawns all objects, including static
	}
    endProcess() {
		delete this.contexts;
		delete this.drawnObjects;
		delete this.staticObjects;
		delete this.hiddenObjects;
		delete this.delObjects;
		delete this.ships;
		delete this.solarSystem;
		delete this.watchShip;
    }
}