import DefenceController from "../../src/subsystems/defenceController.js";
import { Vector2, withinPiRange, angleDiff } from "../helpers.js";
import YourNavigationController from "./NavigationController.js";
import YourPropulsionController from "./PropulsionController.js";
import YourSensorsController from "./SensorsController.js";
export default class YourDefenceController extends DefenceController {
  // To get other subsystem information, use the attributes below.
  // @ts-ignore
  navigation: YourNavigationController; // @ts-ignore
  sensors: YourSensorsController; // @ts-ignore
  propulsion: YourPropulsionController;
  //Add additional attributes here

  // @ts-ignore
  target: number;

  defenceUpdate(
    aimTurret: (angle: number) => void,
    getTubeCooldown: (i: number) => number | Error,
    fireTorpedo: (i: number) => Error | null
  ) {
    if (!this.sensors.target) return;
      aimTurret(this.sensors.target.heading); 
      fireTorpedo(0);
  }

}
