import NavigationController from '../../src/subsystems/navigationController.js';
//import { NumberLiteralType } from '../../../node_modules/typescript/lib/typescript.js'
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        //PUBLIC VARIABLES :)
        this.radius = 0;
        this.angularVelocity = 0;
        this.angle = 0;
        this.positionX = 0;
        this.positionY = 0;
        this.targetPositionX = 0; //PROPULSION: GET US TO THESE COORDINATES
        this.targetPositionY = 0;
        this.linearVelocityX = 0;
        this.linearVelocityY = 0;
        //did we warp to another solar system?
        this.warp = true;
    }
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        //update position function
        const UpdatePosition = () => {
            this.angle = getShipStatus('angle');
            this.positionX = getShipStatus('positionX');
            this.positionY = getShipStatus('positionY');
            this.angularVelocity = getShipStatus('angularVelocity');
            this.linearVelocityX = getShipStatus('linearVelocityX');
            this.linearVelocityY = getShipStatus('linearVelocityY');
        };
        UpdatePosition();
    }
}
