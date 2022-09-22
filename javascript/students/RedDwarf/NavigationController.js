import NavigationController from "../../src/subsystems/navigationController.js";
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        this.angle = 0;
        this.angularVelocity = 0;
    }
    //Add additional attributes here
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        this.angle = getShipStatus("angle");
        this.angularVelocity = getShipStatus("angularVelocity");
        land();
        // if (YourSensorsController.onPlanet) {
        // }
    }
}
