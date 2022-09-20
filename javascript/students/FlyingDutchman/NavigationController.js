import NavigationController from '../../src/subsystems/navigationController.js';
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        this.angle = 0;
    }
    //Add additional attributes here
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        //Student code goes here
        this.angle = getShipStatus('angle');
        land();
    }
}
