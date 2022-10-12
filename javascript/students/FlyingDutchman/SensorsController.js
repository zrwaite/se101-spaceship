import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        this.target = null;
        //Add additional attributes here
        this.passiveScannedObjects = [];
        this.activeScannedObjects = [];
        this.activeHeading = 0;
        this.activeArc = Math.PI / 4;
        this.activeRange = 150;
    }
    get warpgatesOrPlanets() {
        return [...this.passiveScannedObjects, ...this.activeScannedObjects.filter((so) => ["WarpGate", "Planet"].includes(so.type))];
    }
    get asteroids() {
        return this.activeScannedObjects.filter((so) => "Asteroid" == so.type);
    }
    setActiveParam(heading, arc, range) {
        this.activeHeading = heading;
        this.activeArc = arc;
        this.activeRange = range;
    }
    get activeResults() {
        return this.activeScannedObjects;
    }
    sensorsUpdate(activeScan, passiveScan) {
        const passiveScanResult = passiveScan();
        if ((passiveScanResult instanceof Error))
            return;
        this.passiveScannedObjects = passiveScanResult.map((reading) => {
            let type = 'Other';
            let certainty = 0.5;
            let distance = undefined;
            let mass = undefined;
            if (reading.gravity < 0) {
                type = 'WarpGate';
                certainty = 1;
                mass = -100;
                distance = Math.pow(mass / reading.gravity, 0.5);
            }
            else {
                type = 'Planet';
                mass = 10000; // approximation
                distance = Math.pow(mass / reading.gravity, 0.5);
            }
            console.log({ distance, gravity: reading.gravity, mass });
            return {
                angle: reading.heading,
                type,
                certainty,
                mass,
                distance,
            };
        });
        const activeScanResult = activeScan(this.activeHeading, this.activeArc, this.activeRange);
        if ((activeScanResult instanceof Error))
            return;
        this.activeScannedObjects = activeScanResult.map((reading) => {
            var _a, _b;
            const distance = reading.distance;
            let certainty = 0.5;
            let type = 'Other';
            if (distance < 100) {
                certainty = 1;
                type = (_b = (_a = reading.closeRange) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : 'Other';
            }
            return {
                angle: reading.angle,
                distance,
                velocity: reading.velocity,
                radius: reading.radius,
                type,
                certainty,
            };
        });
    }
}
// accurate vector coordinates (angle, distance) of warpgates and planets - navigation
// angle (from velocity), heading, velocity, distance of asteroids - defense
// passive scan - heading, mass/distance - warpgates accurate position, list of objects of certain planets + list of objects of uncertain planets
// meteor - mass = 1, radius = 5
// asteroid - mass = 5, radius = 15
// warpgate - mass = -100, radius = 15
// planet - mass = r^3*PI/10 (1060 ~ 13463), radius = 15 ~ 35
// distance (540, 720) - farthest distance = 900
// gravity = mass/distance (planet gravity > 1)
// active scan - angle(heading), distance, velocity, radius
// close range - type, habitability
