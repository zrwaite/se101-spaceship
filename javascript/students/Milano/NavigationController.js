import NavigationController from '../../src/subsystems/navigationController.js';
//Testing 
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.shipData1 = [];
    }
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        //hello
        while (true) {
            this.shipData1[0] = getShipStatus('radius');
            this.shipData1[1] = getShipStatus('angularVelocity');
            this.shipData1[2] = getShipStatus('angle');
            this.shipData1[3] = getShipStatus('positionX');
            this.shipData1[4] = getShipStatus('positionY');
            this.shipData1[5] = getShipStatus('linearVelocityX');
            this.shipData1[6] = getShipStatus('linearVelocityY');
            this.shipData1[7] = getShipStatus('thrusterPowerMain');
            this.shipData1[8] = getShipStatus('thrusterPowerBow');
            this.shipData1[9] = getShipStatus('thrusterPowerClockwise');
            this.shipData1[10] = getShipStatus('thrusterPowerCounterClockwise');
            land();
            warp();
        }
    }
}
