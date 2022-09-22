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

  KpWHeading:number = 300;
  KdWHeading:number = 5000;

  prevDist:number = 0;



  propulsionUpdate(
    setThruster: (thruster: ThrusterName, power: number) => Error | null
  ) {

    if (!this.sensors.target) return; 

    const currHeadingDiff = angleDiff( //calculate heading angle
      this.navigation.angle,
      this.sensors.target.heading
    );

    const dist = 0; //Replace with given distance value

    const distRate = dist - this.prevDist;

    var distOutput = 0;
    
    const KpDistOutput = dist * 300;
    const KdDistOutput = distRate * 5000;

    distOutput = KpDistOutput + KdDistOutput;



    


    var headingOutput = 0;

    const headingDiffRate = currHeadingDiff-this.prevHeadingDiff; //Find "derivative" of error

    const KpHeadingOutput = currHeadingDiff * this.KpWHeading; //Calculate terms
    const KdHeadingOutput = headingDiffRate * this.KdWHeading;
    headingOutput = KpHeadingOutput + KdHeadingOutput;
    

    // console.log("OUTPUT: " + headingOutput);

    headingOutput = Math.min(Math.max(headingOutput, -100), 100);
    distOutput = Math.min(Math.max(distOutput, -100), 100);


    this.maxOutput = Math.max(this.maxOutput, Math.abs(headingOutput))

    if (headingOutput < 0) {
      setThruster('clockwise', Math.abs(headingOutput))
      setThruster('counterClockwise', 0)
    } else {
      setThruster('counterClockwise', Math.abs(headingOutput))
      setThruster('clockwise', 0)
    }
    // setThruster("main", Math.abs(currHeadingDiff) < 0.2 ? 30 : 0);
    

    if (distOutput < 0) {
      setThruster('main', 0)
      setThruster('bow', Math.abs(distOutput))
    } else{
      setThruster('main', Math.abs(distOutput))
      setThruster('bow', Math.abs(distOutput))
    }

    this.prevHeadingDiff = currHeadingDiff;
    this.prevDist = dist;
  }
}
