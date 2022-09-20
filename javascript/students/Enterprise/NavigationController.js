import NavigationController from '../../src/subsystems/navigationController.js';
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        this.angle = 0; //initializes angle
    }
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        const closeRangeObject = this.sensors.closeRangeObject;
        if (closeRangeObject == "Planet") {
            land();
        }
        this.angle = getShipStatus("angle");
    }
}
