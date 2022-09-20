import NavigationController from '../../src/subsystems/navigationController.js';
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.angle = 0;
        this.angularVelocity = 0;
    }
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        //Student code goes here
        this.angle = getShipStatus('angle');
        this.angularVelocity = getShipStatus("angularVelocity");
        land();
    }
}
