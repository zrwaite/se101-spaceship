import { Vector2, withinPiRange, angleDiff } from "../helpers.js";
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
  private prevHeadingDiff: number | undefined;
  private prevSpeed: number | undefined;

  propulsionUpdate(
    setThruster: (thruster: ThrusterName, power: number) => Error | null
  ) {
    //Student code goes here
    if (!this.sensors.target) return;

    // Speed by getting magnitude
    const speed = Math.pow(
      this.navigation.linearVelocityX ** 2 +
        this.navigation.linearVelocityX ** 2,
      1 / 2
    );

    const correctionalForce = 250;

    const headingDiff = angleDiff(
      this.navigation.angle,
      this.sensors.target.heading
    );
    const force = Math.min(Math.abs(100 * headingDiff), 50);

    const headingDiffBuffer = 0;

    if (headingDiff < -headingDiffBuffer) {
      if (
        this.prevHeadingDiff &&
        this.prevHeadingDiff - headingDiff < -0.001 && // If the spaceship is turning "fast"
        headingDiff >= -0.5 // If almost pointing at the right direction
      ) {
        // Thrust other way
        setThruster("counterClockwise", correctionalForce);
        setThruster("clockwise", 0);
      } else {
        setThruster("clockwise", force);
        setThruster("counterClockwise", 0);
      }
    } else if (headingDiff > headingDiffBuffer) {
      if (
        this.prevHeadingDiff &&
        this.prevHeadingDiff - headingDiff > 0.001 &&
        headingDiff <= 0.5
      ) {
        setThruster("clockwise", correctionalForce);
        setThruster("counterClockwise", 0);
      } else {
        setThruster("counterClockwise", force);
        setThruster("clockwise", 0);
      }
    } else {
      setThruster("counterClockwise", 0);
      setThruster("clockwise", 0);
    }

    setThruster("main", Math.abs(headingDiff) < 0.2 && speed < 0.75 ? 30 : 0);

    this.prevHeadingDiff = headingDiff;
    this.prevSpeed = speed;
  }
}
