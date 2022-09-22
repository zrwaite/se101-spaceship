import { Vector2, withinPiRange } from '../helpers.js';
import NavigationController from '../../src/subsystems/navigationController.js';
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.angle = 0;
        this.shipVelocity = new Vector2(0, 0);
        this.shipPosition = new Vector2(0, 0);
    }
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        //Student code goes here
        //this.angle = getShipStatus('angle')
        //this.sensors.cartesian()
        this.shipVelocity = new Vector2(getShipStatus('linearVelocityX'), getShipStatus('linearVelocityY'));
        this.shipPosition = new Vector2(getShipStatus('positionX'), getShipStatus('positionY'));
        var landDest = this.sensors.landTarget; //absolute coordinates 
        var visited = [];
        if (landDest != null) {
            this.angle = withinPiRange((landDest.subtract(this.shipPosition)).angle());
            console.log("angle" + this.angle);
        }
        // if (getShipStatus('positionX')) {
        // }
        //land();
    }
}
