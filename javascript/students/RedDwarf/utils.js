/**
 * You have to think outside the box
 */
import ColonyShip from "../../src/ship/colonyShip.js";
import Torpedo from "../../src/ship/torpedo.js";
import Asteroid from "../../src/spaceObjects/asteroid.js";
/**
 * Get the entire ship instance.
 * @returns The ship object
 */
export function getShip() {
    return window.game.ships[0];
}
/**
 * Get a property of the ship status (or all properties).
 * @param key (Optional) The key of the ship status to access.
 * @returns The value of the particular key of the ship status if specified, or an object containing the values of all ship status properties otherwise.
 */
export function getShipStatus(key) {
    const ship = getShip();
    const status = {
        positionX: ship.pos.x,
        positionY: ship.pos.y,
        radius: ship.radius,
        linearVelocityX: ship.speed.x,
        linearVelocityY: ship.speed.y,
        angularVelocity: ship.aSpeed,
        angle: ship.angle,
        thrusterPowerMain: ship.thrusterController.thrusterPower.main,
        thrusterPowerBow: ship.thrusterController.thrusterPower.bow,
        thrusterPowerClockwise: ship.thrusterController.thrusterPower.clockwise,
        thrusterPowerCounterClockwise: ship.thrusterController.thrusterPower.counterClockwise,
    };
    return key && key in status ? status[key] : status;
}
/**
 * Get the position and angle to an object relative to the ship.
 * @param obj The space object
 * @returns The relative polar coordinates to the object.
 */
export function getRelativePos(obj) {
    const ship = getShip();
    return {
        angle: ship.pos.angleToPoint(obj.pos),
        distance: ship.pos.distance(obj.pos)
    };
}
/**
 * Get planets in current solar system.
 * @returns Array of planets in current solar system.
 */
export function getPlanets() {
    return getShip().solarSystem.planets;
}
/**
 * Get warp gates in current solar system
 * @returns Array of warp gates in current solar system
 */
export function getWarpGates() {
    return getShip().solarSystem.warpGates;
}
/**
 * Get all objects in the current solar system except for torpedoes and ships.
 * @returns All objects in the current solar system
 */
export function getAllObjects() {
    const ship = getShip();
    return [...ship.process.delObjects, ...ship.process.drawnObjects].filter((obj) => !(obj instanceof Torpedo) && !(obj instanceof ColonyShip));
}
/**
 * Get all asteroids in the current solar system.
 * @returns All asteroids in the current solar system
 */
export function getAsteroids() {
    return getAllObjects().filter(x => x instanceof Asteroid);
}
