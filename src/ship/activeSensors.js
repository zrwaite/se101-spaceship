var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ActiveSensors_parentShip;
import APIResponse from '../helpers/response.js';
export default class ActiveSensors {
    constructor(parentShip) {
        _ActiveSensors_parentShip.set(this, void 0); //Reference to the ColonyShip
        __classPrivateFieldSet(this, _ActiveSensors_parentShip, parentShip, "f");
    }
    scan(heading, arc, range) {
        // Ensure solar system is initialized before performing scan
        if (!__classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").solarSystem)
            return new APIResponse(400, ['Cannot perform ActiveSensors scan until solar system initialized'], []);
        const startPoint = __classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").pos;
        const startAngle = heading.angle();
        //Calculate which objects exist in pizza slice
        // First check if it is within the range
        // Check that angle between start ponit and target point are between the start angle and end angle
        // Note: angle must account for relative position of object to ship (not global position on board)
        // To find angle, find angle difference between the vector from ship to object & current ship heading
        // y coordinate is inverted due to the flipped board axis (greater y value indicates lower position)
        let readings = [];
        for (const planet of __classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").solarSystem.planets) {
            let dist = __classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").pos.distance(planet.pos);
            // let angle = this.#parentShip.angle.angleTo(new Vector2(planet.pos.x - this.#parentShip.pos.x, this.#parentShip.pos.y - planet.pos.y))
            // if (dist + planet.size.x <= range && angle <= arc) {
            // 	let newReading = new EMSReading(angle, dist, new Vector2(0, 0), planet.size.x, planet.composition, null)
            // 	readings.push(newReading)
            // }
        }
        for (const warpgate of __classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").solarSystem.warpGates) {
            let dist = __classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").pos.distance(warpgate.pos);
            // let angle = this.#parentShip.angle.angleTo(new Vector2(warpgate.pos.x - this.#parentShip.pos.x, this.#parentShip.pos.y - warpgate.pos.y))
            // if (dist + warpgate.size.x <= range && angle <= arc) {
            // 	let newReading = new EMSReading(angle, dist, new Vector2(0, 0), warpgate.radius, {}, warpgate.destinationSolarSystem)
            // 	readings.push(newReading)
            // }
        }
        for (const asteroid of __classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").solarSystem.asteroids) {
            let dist = __classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").pos.distance(asteroid.pos);
            // let angle = this.#parentShip.angle.angleTo(new Vector2(asteroid.pos.x - this.#parentShip.pos.x, this.#parentShip.pos.y - asteroid.pos.y))
            // if (dist + asteroid.size.x <= range && angle <= arc) {
            // 	let newReading = new EMSReading(angle, dist, asteroid.speed, asteroid.radius, {}, null)
            // 	readings.push(newReading)
            // }
        }
        return new APIResponse(200, [], readings, true);
    }
}
_ActiveSensors_parentShip = new WeakMap();
