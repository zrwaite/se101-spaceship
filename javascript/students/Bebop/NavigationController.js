import NavigationController from '../../src/subsystems/navigationController.js';
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        this.timer = 0;
    }
    navigationUpdate(shipStatusInfo, warp, land, mapData) {
        var _a;
        if (((_a = this.sensors) === null || _a === void 0 ? void 0 : _a.planetAhead) && this.sensors.planetDistance < 30) {
            warp();
            land();
        }
        //Student code goes here
    }
}
