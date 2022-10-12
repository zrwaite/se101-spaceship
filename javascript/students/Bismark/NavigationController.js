import NavigationController from "../../src/subsystems/navigationController.js";
export default class YourNavigationController extends NavigationController {
    //Add additional attributes here
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        var _a, _b, _c, _d;
        //Student code goes here
        this.angle = getShipStatus("angle");
        this.angVel = getShipStatus("angularVelocity");
        this.velX = getShipStatus("linearVelocityX");
        this.velY = getShipStatus("linearVelocityY");
        this.speed = Math.pow(this.velX ** 2 + this.velY ** 2, 1 / 2);
        if (((_b = (_a = this.sensors.targetDetails) === null || _a === void 0 ? void 0 : _a.closeRange) === null || _b === void 0 ? void 0 : _b.type) === "Planet") {
            land();
        }
        else if (((_d = (_c = this.sensors.targetDetails) === null || _c === void 0 ? void 0 : _c.closeRange) === null || _d === void 0 ? void 0 : _d.type) === "WarpGate") {
            warp();
        }
    }
}
