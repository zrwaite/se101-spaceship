import { Vector2 } from "../helpers.js";
import { MapData, ShipStatus } from "../types.js";

import NavigationController from "../../src/subsystems/navigationController.js";
import YourDefenceController from "./DefenseController.js";
import YourPropulsionController from "./PropulsionController.js";
import YourSensorsController from "./SensorsController.js";

export default class YourNavigationController extends NavigationController {
  // To get other subsystem information, use the attributes below.
  // @ts-ignore
  defence: YourDefenceController; // @ts-ignore
  sensors: YourSensorsController; // @ts-ignore
  propulsion: YourPropulsionController;

  // @ts-ignore
  angle: number; // @ts-ignore
  angVel: number; // @ts-ignore
  velX: number; // @ts-ignore
  velY: number;
  /** Speed of the ship, non-negative magnitude only */
  // @ts-ignore
  speed: number;

  //Add additional attributes here

  navigationUpdate(
    getShipStatus: (key: keyof ShipStatus) => number,
    warp: () => Error | null,
    land: () => Error | null,
    getMapData: () => MapData
  ) {
    //Student code goes here
    this.angle = getShipStatus("angle");
    this.angVel = getShipStatus("angularVelocity");
    this.velX = getShipStatus("linearVelocityX");
    this.velY = getShipStatus("linearVelocityY");

    this.speed = Math.pow(this.velX ** 2 + this.velY ** 2, 1 / 2);

    land();
  }
}
