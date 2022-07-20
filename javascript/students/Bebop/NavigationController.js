import NavigationController from '../../src/subsystems/navigationController.js';
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        this.timer = 0;
    }
    navigationUpdate(shipStatusInfo, warp, land, mapData) { }
}
