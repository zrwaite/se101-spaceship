import { Vector2, withinPiRange } from '../helpers.js';
import NavigationController from '../../src/subsystems/navigationController.js';
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.angle = 0;
        this.shipVelocity = new Vector2(0, 0);
        this.shipPosition = new Vector2(0, 0);
        this.targetAngle = 0;
    }
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        //Student code goes here
        this.angle = getShipStatus('angle'); //ship's current angle
        this.shipVelocity = new Vector2(getShipStatus('linearVelocityX'), getShipStatus('linearVelocityY'));
        this.shipPosition = new Vector2(getShipStatus('positionX'), getShipStatus('positionY'));
        var landDest = this.sensors.landTarget; //absolute coordinates 
        var warpDest = this.sensors.warpTarget;
        var visited = [];
        if (landDest != null) {
            this.targetAngle = withinPiRange((landDest.subtract(this.shipPosition)).angle()); //target angle
            //console.log("angle" + this.angle)
        }
        else if (warpDest != null) {
            this.targetAngle = withinPiRange((warpDest.subtract(this.shipPosition)).angle());
        }
        // if (getShipStatus('positionX')) {
        // }
        //land();
    }
}
