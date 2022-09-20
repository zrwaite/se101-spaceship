import NavigationController from '../../src/subsystems/navigationController.js';
//import { NumberLiteralType } from '../../../node_modules/typescript/lib/typescript.js'
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        //PUBLIC VARIABLES :)
        this.radius = 0; //how big the ship is
        this.angularVelocity = 0;
        this.angle = 0; //direction ship is facing
        this.positionX = 0;
        this.positionY = 0;
        this.linearVelocityX = 0;
        this.linearVelocityY = 0;
        this.thrusterPowerMain = 0;
        this.thrusterPowerBow = 0;
        this.thrusterPowerClockwise = 0;
        this.thrusterPowerCounterClockwise = 0;
    }
    //runs multiple times a second
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        this.angle = getShipStatus('angle');
        land();
        warp();
    }
}
