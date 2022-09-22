import ColonyShip from "../../src/ship/colonyShip";
import Planet from "../../src/spaceObjects/planet";
import { ShipStatus } from "../types";

/**
 * Get the entire ship instance.
 * @returns The ship object
 */
export function getShip() : ColonyShip {
    return (<any>window).game.ships[0];
}

/**
 * Get a property of the ship status (or all properties).
 * @param key (Optional) The key of the ship status to access. 
 * @returns The value of the particular key of the ship status if specified, or an object containing the values of all ship status properties otherwise.
 */
export function getShipStatus(key?: keyof ShipStatus) : ShipStatus | ShipStatus[keyof ShipStatus] {
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
 * Get planets in current solar system.
 * @returns Array of planets in current solar system.
 */
export function getPlanets() : Planet[] {
    return getShip().solarSystem.planets;
}
