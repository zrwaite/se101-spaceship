import NavigationController from '../../src/subsystems/navigationController.js';
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        this.angle = 0; //initializes angle
    }
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        const closeRangeObject = this.sensors.closeRangeObject;
        // Landing if the distance between the spaceship and A planet is less than 20
        if ((closeRangeObject === null || closeRangeObject === void 0 ? void 0 : closeRangeObject.closeRange) && closeRangeObject.closeRange.type === "Planet" && closeRangeObject.distance < 20) {
            land();
        }
        if ((closeRangeObject === null || closeRangeObject === void 0 ? void 0 : closeRangeObject.closeRange) && closeRangeObject.closeRange.type === "WarpGate" && closeRangeObject.distance < 20) {
            warp();
        }
        this.angle = getShipStatus("angle");
    }
}
