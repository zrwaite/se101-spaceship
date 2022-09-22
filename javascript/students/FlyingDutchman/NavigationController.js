import { Vector2 } from '../helpers.js';
import NavigationController from '../../src/subsystems/navigationController.js';
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        this.angle = 0;
        //Add additional attributes here
        this.exploredSystems = [];
        this.mapData = null;
        this.possibleObjects = [];
        this.scanned = false;
        this.position = new Vector2(0, 0);
        this.angularVelocity = 0;
        this.target = new Vector2(0, 0);
        this.targetAngle = 0;
        this.targetIsPlanet = null;
        this.landingDistance = 50; // change if needed
    }
    navigationUpdate(getShipStatus, warp, land, getMapData) {
        //Student code goes here
        if (!this.scanned) {
            this.mapData = getMapData();
            this.scanned = true;
        }
        this.possibleObjects = this.sensors.warpgatesOrPlanets;
        this.updateTarget();
        // Constantly update position
        this.position = new Vector2(getShipStatus('positionX'), getShipStatus('positionY'));
        this.angularVelocity = getShipStatus('angularVelocity');
        this.angle = getShipStatus('angle');
        this.targetAngle = this.target.angle();
        // If target has been set
        if (this.targetIsPlanet !== null) {
            // If the target is a planet
            if (this.targetIsPlanet === true) {
                // If we're close enough, attempt to land
                if (this.target.magnitude() !== 0 && this.target.magnitude() <= this.landingDistance) {
                    land();
                }
            }
            else {
                // If instead the target is a warp gate, attempt to warp
                if (this.target.magnitude() !== 0 && this.target.magnitude() <= this.landingDistance) {
                    warp();
                }
            }
        }
    }
    //getter for mapData
    get getMapData() {
        return this.mapData;
    }
    //getter for target, returns target or null
    get getTarget() {
        return this.target;
    }
    // tries to update target
    updateTarget() {
        let d = 100000; // distance to target, used in x and y calculation
        console.log(this.possibleObjects);
        for (var val of this.possibleObjects) {
            // If the target is a planet
            console.log(val.angle);
            if (val.type === 'Other') {
                if (!(val.distance === undefined)) {
                    d = val.distance;
                }
                // save target angle
                this.targetAngle = val.angle;
                // Calculate target vector
                this.target.set(d * Math.cos(val.angle), d * Math.sin(val.angle));
                if (this.targetIsPlanet === null)
                    this.targetIsPlanet = true;
                break;
            }
            else { // If target is not a planet
                if (!(val.distance === undefined)) {
                    d = val.distance;
                }
                // save target angle
                this.targetAngle = val.angle;
                // Calculate target vector
                this.target.set(d * Math.cos(val.angle), d * Math.sin(val.angle));
                if (this.targetIsPlanet === null)
                    this.targetIsPlanet = false;
            }
        }
    }
    // Public get function to get x and y coordinates of ship
    get getPosition() {
        return this.position;
    }
    // Public get function to get angular velocity of ship
    get getAngularVelocity() {
        return this.angularVelocity;
    }
    get getTargetAngle() {
        return this.targetAngle;
    }
    get getTargetMagnitude() {
        return this.target.magnitude();
    }
}
