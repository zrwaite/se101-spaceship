import { withinPiRange, Vector2 } from "../helpers.js";
import SensorsController from "../../src/subsystems/sensorsController.js";
import YourDefenceController from "./DefenseController.js";
import YourNavigationController from "./NavigationController.js";
import YourPropulsionController from "./PropulsionController.js";
import { EMSReading, PassiveReading } from "../types.js";
export default class YourSensorsController extends SensorsController {
  // To get other subsystem information, use the attributes below.
  // @ts-ignore
  defence: YourDefenceController; // @ts-ignore
  navigation: YourNavigationController; // @ts-ignore
  propulsion: YourPropulsionController;

  target: PassiveReading | undefined;
  targetDetails: EMSReading | undefined;

  activeScan: EMSReading[] = [];

  //Add additional attributes here

  counter = 0;

  sensorsUpdate(
    activeScan: (
      heading: number,
      arc: number,
      range: number
    ) => EMSReading[] | Error,
    passiveScan: () => PassiveReading[] | Error
  ) {
    //Student code goes here
    const scanResult = passiveScan();
    if (!(scanResult instanceof Error)) this.target = scanResult[0];

    if (this.counter % 10 === 0) {
      const activeScanResult = activeScan(
        this.navigation.angle - Math.PI / 4,
        Math.PI / 2,
        500
      );

      if (!(activeScanResult instanceof Error)) {
        this.targetDetails = activeScanResult.find(
          (r) => Math.abs(r.angle - (this.target?.heading ?? 0)) <= 0.01
        );

        this.activeScan = activeScanResult.sort(
          (r1, r2) => r1.distance - r2.distance
        );
      }
    }

    this.counter++;
  }
}
