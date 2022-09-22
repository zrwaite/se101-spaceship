import ColonyShip from "../../src/ship/colonyShip";
import { ShipStatus } from "../types";

export function getShip() : ColonyShip {
    return (<any>window).game.ships[0];
}

export function getFullShipStatus() : ShipStatus {
    const ship = getShip();
    return {
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
}