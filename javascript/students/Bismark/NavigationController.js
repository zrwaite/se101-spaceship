import NavigationController from "../../src/subsystems/navigationController.js";
export default class YourNavigationController extends NavigationController {
    //Add additional attributes here
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        //Student code goes here
        this.angle = getShipStatus("angle");
        this.angVel = getShipStatus("angularVelocity");
        this.velX = getShipStatus("linearVelocityX");
        this.velY = getShipStatus("linearVelocityY");
        this.speed = Math.pow(this.velX ** 2 + this.velY ** 2, 1 / 2);
        land();
    }
}
