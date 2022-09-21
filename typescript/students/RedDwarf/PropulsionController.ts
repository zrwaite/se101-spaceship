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

  prevError:number = 0;
  maxOutput:number = 0;

  kWeight:number = 300;
  dWeight:number = 5000;



  propulsionUpdate(
    setThruster: (thruster: ThrusterName, power: number) => Error | null
  ) {

    if (!this.sensors.target) return; //WTF is this

    const currError = angleDiff( //calculate heading angle
      this.navigation.angle,
      this.sensors.target.heading
    );

    var output = 0;

    const errorDiff = currError-this.prevError; //Find "derivative" of error

    const K = currError * this.kWeight; //Calculate terms
    const D = errorDiff * this.dWeight;
    output = K + D;
    
    // console.log("ANGLE: " + currError)

    console.log("OUTPUT: " + output);

    //Calculate maxoutput
    this.maxOutput = Math.max(this.maxOutput, Math.abs(output))
    // console.log("MAXOUTPUT: " + this.maxOutput)

    if (output < 0) {
      setThruster('clockwise', Math.min(Math.abs(output), 100))
      setThruster('counterClockwise', 0)
    } else {
      setThruster('counterClockwise', Math.min(Math.abs(output), 100))
      setThruster('clockwise', 0)
    }
    setThruster("main", Math.abs(currError) < 0.2 ? 30 : 0);

    this.prevError = currError;
  }
}
