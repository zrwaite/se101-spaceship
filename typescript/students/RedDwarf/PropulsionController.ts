import { Vector2, withinPiRange } from "../helpers.js";
import { ThrusterName } from "../types.js";
import PropulsionController from "../../src/subsystems/propulsionController.js";
import YourDefenceController from "./DefenseController.js";
import YourNavigationController from "./NavigationController.js";
import YourSensorsController from "./SensorsController.js";
import { angleDiff } from "../../src/helpers/Angles.js";
export default class YourPropulsionController extends PropulsionController {
  // To get other subsystem information, use the attributes below.
  // @ts-ignore
  defence: YourDefenceController; // @ts-ignore
  sensors: YourSensorsController; // @ts-ignore
  navigation: YourNavigationController;

  //Add additional attributes here

  prevHeadingDiff:number = 0;
  maxOutput:number = 0;

  kWeight:number = 300;
  dWeight:number = 5000;



  propulsionUpdate(
    setThruster: (thruster: ThrusterName, power: number) => Error | null
  ) {

    if (!this.sensors.target) return; //WTF is this

    const currHeadingDiff = angleDiff( //calculate heading angle
      this.navigation.angle,
      this.sensors.target.heading
    );

    var headingOutput = 0;

    const headingDiffRate = currHeadingDiff-this.prevHeadingDiff; //Find "derivative" of error

    const KpHeadingOutput = currHeadingDiff * this.kWeight; //Calculate terms
    const KdHeadingOutput = headingDiffRate * this.dWeight;
    headingOutput = KpHeadingOutput + KdHeadingOutput;
    

    console.log("OUTPUT: " + headingOutput);

    headingOutput = Math.min(Math.max(headingOutput, -100), 100);


    this.maxOutput = Math.max(this.maxOutput, Math.abs(headingOutput))

    if (headingOutput < 0) {
      setThruster('clockwise', Math.abs(headingOutput))
      setThruster('counterClockwise', 0)
    } else {
      setThruster('counterClockwise', Math.abs(headingOutput))
      setThruster('clockwise', 0)
    }
    setThruster("main", Math.abs(currHeadingDiff) < 0.2 ? 30 : 0);

    this.prevHeadingDiff = currHeadingDiff;
  }
}
