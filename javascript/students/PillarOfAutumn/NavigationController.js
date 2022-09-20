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
        land();
        // needs a function to warp when the spaceship is on the warpgate
    }
}
