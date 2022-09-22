import { Vector2 } from '../helpers.js';
import NavigationController from '../../src/subsystems/navigationController.js';
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        this.angle = 0;
        //Add additional attributes here
        this.exploredSystems = [];
        this.mapData = null;
        this.possibleObjects = [];
        this.scanned = false;
        this.position = new Vector2(0, 0);
        this.target = new Vector2(0, 0);
        this.targetIsPlanet = null;
        this.landingDistance = 50; // change if needed
    }
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        //Student code goes here
        if (!this.scanned) {
            this.mapData = getMapData();
            this.scanned = true;
        }
        // Constantly update position
        this.position = new Vector2(getShipStatus('positionX'), getShipStatus('positionY'));
        this.angle = getShipStatus('angle');
        // If target has been set
        if (this.targetIsPlanet !== null) {
            // If the target is a planet
            if (this.targetIsPlanet === true) {
                // If we're close enough, attempt to land
                if (this.target.magnitude() !== 0 && this.target.magnitude() <= this.landingDistance) {
                    land();
                }
            }
            else {
                // If instead the target is a warp gate, attempt to warp
                if (this.target.magnitude() !== 0 && this.target.magnitude() <= this.landingDistance) {
                    warp();
                }
            }
        }
    }
    //getter for mapData
    get getMapData() {
        return this.mapData;
    }
    //getter for target, returns target or null
    get getTarget() {
        return this.target;
    }
    // tries to update target
    updateTarget() {
        let d = 100000; // distance to target, used in x and y calculation
        // if target is not set - condition isnt necessary????
        if (this.targetIsPlanet === null) {
            for (var val of this.possibleObjects) {
                // If the target is a planet
                if (val.type === 'Other') {
                    // add to list of explored objects?
                    if (!(val.distance === undefined)) {
                        d = val.distance;
                    }
                    // Calculate target vector
                    this.target.set(d * Math.cos(val.angle), d * Math.sin(val.angle));
                    this.targetIsPlanet = true;
                    break;
                }
                else { // If target is not a planet
                    this.targetIsPlanet = false;
                    if (!(val.distance === undefined)) {
                        d = val.distance;
                    }
                    // Calculate target vector
                    this.target.set(d * Math.cos(val.angle), d * Math.sin(val.angle));
                }
            }
        }
        else if (true) {
            //update if target was succesfully scanned, based on habitibility etc. 
            //TODO: get sensors to add uid to objects, which will let us set distance to target
            //without risk of changing target
        }
        else {
            // dont update otherwise
        }
    }
    // Public get function to get x and y coordinates of ship
    get getPosition() {
        return this.position;
    }
}
