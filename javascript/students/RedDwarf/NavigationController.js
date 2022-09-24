import NavigationController from "../../src/subsystems/navigationController.js";
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        this.angle = 0;
        this.angularVelocity = 0;
        this.shipX = 0;
        this.shipY = 0;
    }
    //Add additional attributes here
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        this.angle = getShipStatus("angle");
        this.angularVelocity = getShipStatus("angularVelocity");
        this.shipX = getShipStatus("positionX");
        this.shipY = getShipStatus("positionY");
        //If we are close to target
        if (this.propulsion.currDist < 50) {
            //If gravity is pos -> planet -> land
            //If gravity is neg -> warp gate -> warps
            if (this.sensors.target && this.sensors.target.gravity > 0) {
                land();
            }
            else {
                warp();
            }
        }
    }
}
