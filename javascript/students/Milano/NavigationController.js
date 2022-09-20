import NavigationController from '../../src/subsystems/navigationController.js';
//Testing 
export default class YourNavigationController extends NavigationController {
    //Add additional attributes here
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        this.angle = getShipStatus('angle');
        land();
        //hello
    }
}
