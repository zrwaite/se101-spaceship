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
var _ActiveSensors_instances, _ActiveSensors_parentShip, _ActiveSensors_pointInScanSlice;
import EMSReading from './EMSReading.js';
import APIResponse from '../helpers/response.js';
import Vector2 from '../helpers/Vector2.js';
import ColonyShip from './colonyShip.js';
import RenderedObject from '../renderedObject.js';
import Planet from '../spaceObjects/planet.js';
import Torpedo from './torpedo.js';
import WarpGate from '../spaceObjects/warpGate.js';
export default class ActiveSensors extends RenderedObject {
    constructor(parentShip, game) {
        super(parentShip.pos, game);
        _ActiveSensors_instances.add(this);
        _ActiveSensors_parentShip.set(this, void 0); //Reference to the ColonyShip
        this.ctx = 'ships';
        this.cooldown = 0;
        this.radius = 5;
        this.arcStartAngle = 0;
        this.arcEndAngle = Math.PI * 0.5;
        __classPrivateFieldSet(this, _ActiveSensors_parentShip, parentShip, "f");
        this.pos = __classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").pos;
    }
    scan(heading, arc, range) {
        __classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").energyUsed += Math.round((arc * range * range) / 4000);
        // Ensure solar system is initialized before performing scan
        if (!__classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").solarSystem)
            return new APIResponse(400, ['Cannot perform ActiveSensors scan until solar system initialized'], []);
        if (arc > Math.PI)
            return new APIResponse(400, ['arc is too large. Max: Pi'], []);
        if (arc < 0)
            return new APIResponse(400, ['arc must be larger than 0'], []);
        if (heading > Math.PI || heading < -Math.PI)
            return new APIResponse(400, [`heading of ${heading} must be between Pi and -Pi `], []);
        if (this.cooldown)
            return new APIResponse(400, ['ActiveSensors is still on cooldown'], []);
        this.cooldown = 50;
        this.arcStartAngle = heading;
        this.arcEndAngle = this.arcStartAngle + arc;
        if (this.arcEndAngle > Math.PI)
            this.arcEndAngle = -2 * Math.PI + this.arcEndAngle;
        if (this.arcEndAngle < -Math.PI)
            this.arcEndAngle = 2 * Math.PI - this.arcEndAngle;
        this.radius = range;
        //Calculate which objects exist in pizza slice
        // First check if it is within the range
        // Check that angle between start ponit and target point are between the start angle and end angle
        // Note: angle must account for relative position of object to ship (not global position on board)
        // To find angle, find angle difference between the vector from ship to object & current ship heading
        // y coordinate is inverted due to the flipped board axis (greater y value indicates lower position)
        let readings = [];
        const allDetectableSpaceObjects = [...__classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").process.delObjects, ...__classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").process.drawnObjects].filter((obj) => !(obj instanceof Torpedo) && !(obj instanceof ColonyShip));
        for (const spaceObject of allDetectableSpaceObjects) {
            if (__classPrivateFieldGet(this, _ActiveSensors_instances, "m", _ActiveSensors_pointInScanSlice).call(this, spaceObject.pos)) {
                const angle = spaceObject.pos.angleToPoint(__classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").pos);
                const distance = __classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").pos.distance(spaceObject.pos);
                const scanSignature = spaceObject instanceof Planet ? spaceObject.composition : undefined;
                const velocity = spaceObject instanceof Planet || spaceObject instanceof WarpGate ? Vector2.zero : spaceObject.speed;
                readings.push(new EMSReading(angle, velocity, spaceObject.radius, distance, scanSignature));
            }
        }
        return new APIResponse(200, [], readings, true);
    }
    draw() {
        if (!this.cooldown)
            return;
        // Set the context's translation.
        let ctx = this.game.contexts[this.ctx];
        ctx.setTransform(1, 0, 0, 1, ((this.pos.x / 10) * this.game.unit - this.game.camera.x) * this.game.zoom, ((this.pos.y / 10) * this.game.unit - this.game.camera.y) * this.game.zoom);
        ctx.fillStyle = `rgba(255, 0, 0, ${this.cooldown / 100})`;
        ctx.lineWidth = 2;
        const drawRadius = ((50 - this.cooldown) * this.radius) / 50;
        if (Math.abs(Math.abs(this.arcStartAngle) - Math.abs(this.arcEndAngle)) > Math.PI) {
            console.log('too big');
        }
        else {
            ctx.beginPath();
            ctx.arc(0, 0, (drawRadius * this.game.unit * this.game.zoom) / 10, this.arcStartAngle, this.arcEndAngle);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            let startPoint = new Vector2(drawRadius, 0).rotateTo(this.arcStartAngle).scale((this.game.unit * this.game.zoom) / 10);
            let endPoint = new Vector2(drawRadius, 0).rotateTo(this.arcEndAngle).scale((this.game.unit * this.game.zoom) / 10);
            ctx.lineTo(startPoint.x, startPoint.y);
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.closePath();
            ctx.fill();
        }
    }
    update() {
        if (this.cooldown > 0)
            this.cooldown -= 1;
        else
            this.cooldown = 0;
        this.pos = __classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").pos;
    }
}
_ActiveSensors_parentShip = new WeakMap(), _ActiveSensors_instances = new WeakSet(), _ActiveSensors_pointInScanSlice = function _ActiveSensors_pointInScanSlice(point) {
    let dist = __classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").pos.distance(point);
    if (dist > this.radius)
        return false;
    let angle = point.subtract(__classPrivateFieldGet(this, _ActiveSensors_parentShip, "f").pos).angle();
    if (this.arcStartAngle > 0 && this.arcEndAngle < 0) {
        if ((angle > this.arcEndAngle && angle < this.arcStartAngle) || (angle < this.arcStartAngle && angle > this.arcEndAngle))
            return false;
    }
    else {
        if (angle < this.arcStartAngle || angle > this.arcEndAngle)
            return false;
    }
    return true;
};
