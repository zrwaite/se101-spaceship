import NavigationController from '../../src/subsystems/navigationController.js';
let planet = true;
let portal = true;
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        this.angle = 0;
    }
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        this.angle = getShipStatus('angle');
        //figure out how to read mapdata
        land();
        warp();
        getMapData();
        if (planet) {
            console.log("PLEASE");
            land();
            planet = false;
        }
        if (portal) {
            warp();
            portal = false;
        }
    }
}
