import NavigationController from '../../src/subsystems/navigationController.js';
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        this.angle = 0;
        //Add additional attributes here
        this.exploredSystems = [];
        this.mapData = null;
        //possibleObjects: SpaceObject[] = []
        this.scanned = false;
        this.target = null;
    }
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        //Student code goes here
        if (!this.scanned) {
            this.mapData = getMapData();
            this.scanned = true;
        }
        this.angle = getShipStatus('angle');
        land();
    }
    //getter for mapData
    get getMapData() {
        return this.mapData;
    }
    //getter for target, returns vector 2 or null
    get getTarget() {
        return this.target;
    }
    // updates target
    updateTarget() {
        if (this.target == null) {
            //update if null
        }
        else if (true) {
            //update if target was succesfully scanned
        }
        else {
            // dont update otherwise
        }
    }
}
