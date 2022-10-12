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
  angle = 0;
  angularVelocity = 0;
  shipX = 0;
  shipY = 0;

  //Add additional attributes here

  navigationUpdate(
    getShipStatus: (key: keyof ShipStatus) => number,
    warp: () => Error | null,
    land: () => Error | null,
    getMapData: () => MapData
  ) {
    this.angle = getShipStatus("angle");
    this.angularVelocity = getShipStatus("angularVelocity");
    this.shipX = getShipStatus("positionX");
    this.shipY = getShipStatus("positionY");


    


    //If we are close to target
    if(this.propulsion.currDist < 50){
      //If gravity is pos -> planet -> land
      //If gravity is neg -> warp gate -> warps
      if(this.sensors.target && this.sensors.target.gravity > 0){
        land();
      }else{
        warp();

      }

    }
  }
}
