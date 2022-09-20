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

  angle?: number;
  angularVelocity?: number;
  linearVelocityX?: number;
  linearVelocityY?: number;

  navigationUpdate(
    getShipStatus: (key: keyof ShipStatus) => number,
    warp: () => Error | null,
    land: () => Error | null,
    getMapData: () => MapData
  ) {
    this.angle = getShipStatus("angle");
    console.log(this.angle);
    this.angularVelocity = getShipStatus("angularVelocity");
    this.linearVelocityX = getShipStatus("linearVelocityX");
    this.linearVelocityY = getShipStatus("linearVelocityY");

    /* instead of landing all the time:
      - pull data from an EMS scan
      - pull current x/y position
      - if the close range data returns that there is a planet and that the position of the planet contains our x/y, try to land
      - if the same but for gates, attempt to warp
    */

    /* to keep track of gate loops:
      - before the use of a warp command, use getMapData() and note the position of the gate
      - keep track, in an ordered list, the galaxies that have been visited
      - if you visit a galaxy and the galaxy before the last was the same galaxy, prevent propulsion from targetting that warp gate
    */

    /* 
    
    */
    warp();
    land();
  }
}
