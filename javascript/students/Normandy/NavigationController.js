import NavigationController from '../../src/subsystems/navigationController.js';
//import { NumberLiteralType } from '../../../node_modules/typescript/lib/typescript.js'
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.angle = 0;
    }
    navigationUpdate(getShipStatus, warp, land, getMapData) {
    }
}
