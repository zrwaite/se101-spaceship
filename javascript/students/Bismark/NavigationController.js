import NavigationController from "../../src/subsystems/navigationController.js";
export default class YourNavigationController extends NavigationController {
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        var _a, _b, _c, _d, _e;
        this.angle = getShipStatus("angle");
        this.angularVelocity = getShipStatus("angularVelocity");
        this.linearVelocityX = getShipStatus("linearVelocityX");
        this.linearVelocityY = getShipStatus("linearVelocityY");
        this.posX = getShipStatus("positionX");
        this.posY = getShipStatus("positionY");
        /* instead of landing all the time:
          - pull data from an EMS scan
          - pull current x/y position
          - if the close range data returns that there is a planet and that the position of the planet contains our x/y, try to land
          - if the same but for gates, attempt to warp
        */
        /* to keep track of gate loops:
          - before the use of a warp command, use getMapData() and note the position of the gate
          - keep track, in an ordered list, the galaxies that have been visited
          - if you visit a galaxy and the galaxy before the last was the same galaxy, prevent propulsion from targetting that warp gate
        */
        /*
        
        */
        const distanceToTarget = (_a = this.sensors.targetDetails) === null || _a === void 0 ? void 0 : _a.distance;
        if (distanceToTarget && distanceToTarget <= 60) {
            console.log("HERE");
            // May be able to be deleted later.
            if (((_c = (_b = this.sensors.targetDetails) === null || _b === void 0 ? void 0 : _b.closeRange) === null || _c === void 0 ? void 0 : _c.type) === "Planet") {
                land();
            }
            else if (((_e = (_d = this.sensors.targetDetails) === null || _d === void 0 ? void 0 : _d.closeRange) === null || _e === void 0 ? void 0 : _e.type) === "WarpGate") {
                warp();
            }
        }
    }
}
