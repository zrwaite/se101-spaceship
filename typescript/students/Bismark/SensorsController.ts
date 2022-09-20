import { withinPiRange, Vector2 } from "../helpers.js";
import SensorsController from "../../src/subsystems/sensorsController.js";
import YourDefenceController from "./DefenseController.js";
import YourNavigationController from "./NavigationController.js";
import YourPropulsionController from "./PropulsionController.js";
import { EMSReading, PassiveReading } from "../types.js";
import { CloseRangeData } from "../../src/ship/EMSReading.js";
export default class YourSensorsController extends SensorsController {
  // To get other subsystem information, use the attributes below.
  // @ts-ignore
  defence: YourDefenceController; // @ts-ignore
  navigation: YourNavigationController; // @ts-ignore
  propulsion: YourPropulsionController;

  target: PassiveReading | undefined;

  sensorsUpdate(
    activeScan: (
      heading: number,
      arc: number,
      range: number
    ) => EMSReading[] | Error,
    passiveScan: () => PassiveReading[] | Error
  ) {
    const scanResult = passiveScan();

    interface PassiveReading {
      heading: number;
      gravity: number;
    }

    if (!(scanResult instanceof Error)) this.target = scanResult[0];
    interface EMSReading {
      angle: number;
      distance: number;
      velocity: Vector2;
      radius: number;
      closeRange?: CloseRangeData;
    }

    interface CloseRangeData {
      type: "Planet" | "Meteor" | "Asteroid" | "WarpGate" | "Other";
      planetComposition?: {
        water: number;
        air: number;
        land: number;
        metal: number;
        safety: number;
        temperature: number;
      };
    }
  }
}
