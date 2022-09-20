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
        land();
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
        if (this.target.magnitude() === 0) {
            for (var val of this.possibleObjects) {
                if (val.type === 'Other') {
                    // add to list of explored objects?
                    if (!(val.distance === undefined)) {
                        d = val.distance;
                    }
                    this.target.set(d * Math.cos(val.angle), d * Math.sin(val.angle));
                }
            }
        }
        else if (true) {
            //update if target was succesfully scanned, based on habitibility etc.
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
