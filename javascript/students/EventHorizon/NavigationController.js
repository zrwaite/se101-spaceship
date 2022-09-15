import NavigationController from '../../src/subsystems/navigationController.js';
export default class YourNavigationController extends NavigationController {
    //Add additional attributes here
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        this.angle = getShipStatus('angle')
        land()

    }
}
