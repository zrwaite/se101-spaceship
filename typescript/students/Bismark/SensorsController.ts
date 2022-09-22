import { withinPiRange, Vector2 } from "../helpers.js";
import SensorsController from "../../src/subsystems/sensorsController.js";
import YourDefenceController from "./DefenseController.js";
import YourNavigationController from "./NavigationController.js";
import YourPropulsionController from "./PropulsionController.js";
import { EMSReading, PassiveReading } from "../types.js";
import { CloseRangeData } from "../../src/ship/EMSReading.js";
import { buildShip } from "../../src/ship/buildShip.js";
import ColonyShip from "../../src/ship/colonyShip.js";
import ActiveSensors from "../../src/ship/activeSensors.js";
import Planet from "../../src/spaceObjects/planet.js";
export default class YourSensorsController extends SensorsController {
  // To get other subsystem information, use the attributes below.
  // @ts-ignore
  defence: YourDefenceController; // @ts-ignore
  navigation: YourNavigationController; // @ts-ignore
  propulsion: YourPropulsionController;

  target: PassiveReading | undefined;
  targetDetails: EMSReading | undefined;
  activeScan: EMSReading[] | undefined;
  onTarget: Boolean | undefined;

  sensorsUpdate(
    activeScan: (
      heading: number,
      arc: number,
      range: number
    ) => EMSReading[] | Error,
    passiveScan: () => PassiveReading[] | Error
  ) {
    if (this.navigation.angle === undefined) return;
    if (this.navigation.linearVelocityY === undefined) return;
    if (this.navigation.linearVelocityX === undefined) return;

    //check if ships velocity is moving towards the target
    var VAngle = Math.atan(
      this.navigation.linearVelocityY / this.navigation.linearVelocityX
    );
    if (
      this.target != undefined &&
      (VAngle < this.target.heading - 0.5 || VAngle > this.target.heading + 0.5)
    ) {
      this.onTarget = true;
    }

    const scanResult = passiveScan();
    if (!(scanResult instanceof Error)) this.target = scanResult[0];

    const activeScanResult = activeScan(
      this.navigation.angle - Math.PI / 2,
      Math.PI,
      250
    );

    if (!(activeScanResult instanceof Error)) {
      this.targetDetails = activeScanResult.find(
        (r) => r.angle === this.target?.heading
      );

      this.activeScan = activeScanResult.sort(
        (r1, r2) => r1.distance - r2.distance
      );
    }
  }
}
