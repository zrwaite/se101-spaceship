import { angleDiff, Vector2, withinPiRange } from "../helpers.js";
import { ThrusterName } from "../types.js";
import PropulsionController from "../../src/subsystems/propulsionController.js";
import YourDefenceController from "./DefenseController.js";
import YourNavigationController from "./NavigationController.js";
import YourSensorsController from "./SensorsController.js";
export default class YourPropulsionController extends PropulsionController {
  // To get other subsystem information, use the attributes below.
  // @ts-ignore
  defence: YourDefenceController; // @ts-ignore
  sensors: YourSensorsController; // @ts-ignore
  navigation: YourNavigationController;

  //Add additional attributes here

  propulsionUpdate(
    setThruster: (thruster: ThrusterName, power: number) => Error | null
  ) {
    const angle = this.navigation.angle;
    const heading = this.navigation.targetAngle;
    const headingDiff = angleDiff(
      angle,
      heading
    );
    const force = Math.min(Math.abs(400 * headingDiff), 100);
    if (headingDiff < 0) {
      setThruster("clockwise", force);

      //Adding countersteer.
      setThruster("counterClockwise", force / 3);
    } else {
      setThruster("counterClockwise", force);

      //Adding countersteer.
      setThruster("clockwise", force / 3);
    }

    //Rocket thrusts towards target within a greater range.
    setThruster("main", Math.abs(headingDiff) < 1 ? 20 : 0);
  }
}
