import Vector2 from './helpers/Vector2.js';
import ColonyShip from './ship/colonyShip.js';
export default class Process {
    constructor(game, solarSystem, index) {
        /* Default Attributes */
        this.initializing = 1;
        this.drawnObjects = []; //  Objects that always need to be drawn and updated
        this.hiddenObjects = []; // Objects that need to be updated only
        this.staticObjects = [];
        this.delObjects = []; // Objects that need to be drawn and updated until deleted
        this.ships = []; // Array of ship objects
        // Animation Elements (UI uses these too)
        // --- The rendered width is:   (Math.floor(this.width / this.zoom) * this.unit);
        this.frame = 0; // this increments every frame
        this.paused = false; // If the whole game is paused
        /* Other Attributes */
        this.allShips = false; // Stores the number of ships that are rendered
        this.watchShip = null; // Ship being watched
        this.unit = 0; // Global Unit
        this.game = game;
        this.solarSystem = solarSystem;
        this.index = index;
        this.width = this.game.width; // in units
        this.height = this.game.height; // in units
        this.images = this.game.images;
        this.contexts = this.game.contexts;
    }
    start(ships, watchShip) {
        this.ships = ships;
        this.watchShip = watchShip;
        let startPosition = new Vector2(30, 30); //start at centre for now
        this.ships.forEach((ship) => (ship.pos = startPosition));
        let objectsList = [...this.delObjects, ...this.drawnObjects, ...this.hiddenObjects];
        for (let i = 0; i < objectsList.length; i++)
            delete objectsList[i];
        this.delObjects = [...this.solarSystem.asteroids]; //Asteroids get deleted
        this.drawnObjects = [...this.ships]; //Ships get drawn
        this.staticObjects = [...this.solarSystem.warpGates, ...this.solarSystem.planets];
        this.hiddenObjects = [...this.solarSystem.asteroidLaunchers] //Launchers are hidden
        ;
        [...this.delObjects, ...this.solarSystem.warpGates, ...this.solarSystem.planets, ...this.hiddenObjects].forEach((object) => {
            object.initialize(this);
        });
        this.draw();
        this.update();
        this.initializing = 0; // DONE STARTING
    }
    appendShip(ship) {
        this.ships.push(ship);
        this.drawnObjects.push(ship);
    }
    dealocateShip(ship) {
        let shipIndex = -1;
        for (let i = 0; i < this.ships.length; i++) {
            if (this.ships[i].name === ship.name) {
                shipIndex = i;
                break;
            }
        }
        if (shipIndex !== -1)
            this.ships.splice(shipIndex, 1);
        else
            throw Error('Ship not found');
        shipIndex = -1;
        for (let i = 0; i < this.drawnObjects.length; i++) {
            let drawnObj = this.drawnObjects[i];
            if (drawnObj instanceof ColonyShip) {
                if (drawnObj.name === ship.name) {
                    shipIndex = i;
                    break;
                }
            }
        }
        if (shipIndex !== -1)
            this.drawnObjects.splice(shipIndex, 1);
        else
            throw Error('Ship not found');
    }
    spawnDeletableObject(obj) {
        this.delObjects.push(obj);
    }
    update() {
        if (this.ships.length === 0)
            return;
        this.game.detectProcessCollisions(this);
        this.delObjects = this.delObjects.filter((obj) => !obj.delete) // Filter objects no longer needed
        ;
        [...this.drawnObjects, ...this.delObjects, ...this.hiddenObjects].forEach((object) => object.update()); //Updates all objects
        this.frame++;
    }
    draw() {
        //Draws all drawn objects
        ;
        [...this.drawnObjects, ...this.staticObjects, ...this.delObjects].forEach((object) => object.draw());
    }
    rerenderStatic() {
        let solarSystemNameElement = document.getElementById('SolarSystemName');
        if (solarSystemNameElement) {
            solarSystemNameElement.innerHTML = this.solarSystem.name;
            ['missiles', 'planets', 'objects', 'thrusters', 'ships', 'items'].forEach((object) => {
                this.contexts[object].setTransform(1, 0, 0, 1, 0, 0);
                this.contexts[object].clearRect(0, 0, this.width * this.unit, this.height * this.unit);
            });
            [...this.drawnObjects, ...this.staticObjects, ...this.delObjects].forEach((object) => object.draw()); //Redraws all objects, including static
        }
        else
            throw Error('Missing element SolarSystemName');
    }
    endProcess() {
        for (let i = 0; i < this.contexts.length; i++)
            delete this.contexts[i];
        for (let i = 0; i < this.drawnObjects.length; i++)
            delete this.drawnObjects[i];
        for (let i = 0; i < this.staticObjects.length; i++)
            delete this.staticObjects[i];
        for (let i = 0; i < this.hiddenObjects.length; i++)
            delete this.hiddenObjects[i];
        for (let i = 0; i < this.delObjects.length; i++)
            delete this.delObjects[i];
        for (let i = 0; i < this.ships.length; i++)
            delete this.ships[i];
    }
}
