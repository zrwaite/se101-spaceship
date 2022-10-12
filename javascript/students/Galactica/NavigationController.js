import NavigationController from '../../src/subsystems/navigationController.js';
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.angle = 0;
        this.xVelocity = 0;
        this.yVelocity = 0;
    }
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        this.angle = getShipStatus('angle');
        this.xVelocity = getShipStatus('linearVelocityX');
        this.yVelocity = getShipStatus('linearVelocityY');
        // console.log(this.angle)
        land();
        warp();
    }
}
