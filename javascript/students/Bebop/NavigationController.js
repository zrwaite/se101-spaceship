import NavigationController from '../../src/subsystems/navigationController.js';
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.startWarping = false;
        this.startLanding = false;
        this.radius = 0;
        this.angularVelocity = 0;
        this.angle = 0;
        this.positionX = 0;
        this.positionY = 0;
        this.linearVelocityX = 0;
        this.linearVelocityY = 0;
        this.thrusterPowerMain = 0;
        this.thrusterPowerBow = 0;
        this.thrusterPowerClockwise = 0;
        this.thrusterPowerCounterClockwise = 0;
    }
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        // Update attributes (currently don't know which ones are needed by other subsystems)
        // this.radius = getShipStatus('radius');
        this.angularVelocity = getShipStatus('angularVelocity');
        this.angle = getShipStatus('angle');
        // this.positionX = getShipStatus('positionX');
        // this.positionY = getShipStatus('positionY');
        this.linearVelocityX = getShipStatus('linearVelocityX');
        this.linearVelocityY = getShipStatus('linearVelocityY');
        // this.thrusterPowerMain = getShipStatus('thrusterPowerMain');
        // this.thrusterPowerBow = getShipStatus('thrusterPowerBow');
        // this.thrusterPowerClockwise = getShipStatus('thrusterPowerClockwise');
        // this.thrusterPowerCounterClockwise = getShipStatus('thrusterPowerCounterClockwise');
        /*plan: sense for objects, if there is an object:
         if the object is a planet, land,
         if it is a warp, warp
         otherwise, do nothing (for now)
         */
        if (this.startLanding) {
            land();
            console.log("land");
        }
        if (this.startWarping) {
            warp();
            console.log("warp");
        }
        if (this.sensors.activeScanData) {
            for (let i = 0; i < this.sensors.activeScanData.length; i++) {
                const obj = this.sensors.activeScanData[i];
                if (obj.closeRange && obj.distance <= 100) {
                    if (obj.closeRange.type === 'Planet') {
                        this.startLanding = true;
                    }
                    else if (obj.closeRange.type === 'WarpGate') {
                        this.startWarping = true;
                    }
                }
            }
        }
    }
}
