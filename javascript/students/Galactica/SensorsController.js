import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.target = null;
        this.spaceObjects = null;
        this.spaceObjectsDetailed = null;
        this.targetDistance = 0;
        this.activeArray = new Array(4);
        this.facing = "";
    }
    // helper function to convert degrees to radians
    rad(angleDeg) {
        return angleDeg * Math.PI / 180;
    }
    sensorsUpdate(activeScan, passiveScan) {
        const passiveScanResult = passiveScan();
        if (!(passiveScanResult instanceof Error))
            console.log(passiveScanResult);
        if (!(passiveScanResult instanceof Error))
            this.target = passiveScanResult[0]; //reading first object that passiveScan scans
        const activeScanResult = activeScan(this.navigation.angle - this.rad(10), this.rad(20), 400); // Lower range for energy efficiency
        if (!(activeScanResult instanceof Error))
            console.log(activeScanResult);
        if (!(activeScanResult instanceof Error)) {
            if (activeScanResult.length > 0) {
                this.activeArray = activeScanResult;
                this.targetDistance = activeScanResult[0].distance; //finding distance to first object activeScan scans
            }
        }
        //Update Space Info, not 100% reliable, if there headings are very similar
        if (!(passiveScanResult instanceof Error) && !(activeScanResult instanceof Error)) {
            this.spaceObjectsDetailed = [];
            for (var passiveSpaceObject of passiveScanResult) {
                for (var activeSpaceObject of activeScanResult) {
                    if ((passiveSpaceObject.heading - activeSpaceObject.angle) < 1) {
                        var gravity = passiveSpaceObject.gravity;
                        var radius = activeSpaceObject.radius;
                        var mass = gravity * radius * radius;
                        var spaceObjectType = "Unknown";
                        if (mass < 0) {
                            spaceObjectType = "WarpGate";
                        }
                        if (0 <= mass && mass <= 2) {
                            spaceObjectType = "Meteor";
                        }
                        if (3 <= mass && mass <= 7) {
                            spaceObjectType = "Asteroid";
                        }
                        if (2300 <= mass && mass <= 30000) {
                            spaceObjectType = "Planet";
                        }
                        if (31000 <= mass && mass <= 44000) {
                            spaceObjectType = "Star";
                        }
                        //Not bothering with Blackhole
                        // Each detailed space object will have the information of type and angle
                        this.spaceObjectsDetailed.push({ type: spaceObjectType, angle: activeSpaceObject.angle });
                    }
                }
            }
        }
        console.log("Details");
        console.log(this.spaceObjectsDetailed);
        if (this.spaceObjectsDetailed != null) {
            this.facing = this.spaceObjectsDetailed[0].type;
        }
        // console.log(this.targetDistance)
    }
    findMeteors(scanResults) {
        var meteors = [];
        if (scanResults instanceof Error)
            return;
        for (var scanResult of scanResults) {
            if (!(scanResult.closeRange)) {
                return;
            }
            if (scanResult.closeRange.type == 'Meteor') {
                meteors.push(scanResult);
            }
        }
        return meteors;
    }
}
