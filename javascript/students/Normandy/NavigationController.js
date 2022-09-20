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
        this.targetPositionX = 0; //PROPULSION: GET US TO THESE COORDINATES
        this.targetPositionY = 0;
        this.linearVelocityX = 0;
        this.linearVelocityY = 0;
    }
    //MAIN => runs multiple times a second
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        //galaxy MAP
        //let map = new Map<Galaxy, SolarSystem[]>();
        //position updates
        this.angle = getShipStatus('angle');
        this.positionX = getShipStatus('positionX');
        this.positionY = getShipStatus('positionY');
        this.linearVelocityX = getShipStatus('linearVelocityX');
        this.linearVelocityY = getShipStatus('linearVelocityY');
    }
}
