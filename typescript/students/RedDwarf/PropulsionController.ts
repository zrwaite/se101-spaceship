import { Vector2, withinPiRange } from "../helpers.js";
import { ThrusterName } from "../types.js";
import PropulsionController from "../../src/subsystems/propulsionController.js";
import YourDefenceController from "./DefenseController.js";
import YourNavigationController from "./NavigationController.js";
import YourSensorsController from "./SensorsController.js";
import { angleDiff } from "../../src/helpers/Angles.js";

import { getPlanets, getShip, getWarpGates } from "./utils.js";

export default class YourPropulsionController extends PropulsionController {
  // To get other subsystem information, use the attributes below.
  // @ts-ignore
  defence: YourDefenceController; // @ts-ignore
  sensors: YourSensorsController; // @ts-ignore
  navigation: YourNavigationController;

  //Add additional attributes here

  prevHeadingDiff: number = 0;
  maxOutput: number = 0;

  KpWHeading: number = 300;
  KdWHeading: number = 5000;

  prevDist: number = 0;

  //propulsion update pulls data about the ship and its trajectory
  propulsionUpdate(
    setThruster: (thruster: ThrusterName, power: number) => Error | null
  ) {

    if (!this.sensors.target) return;

    const currHeadingDiff = angleDiff( //calculate heading angle
      this.navigation.angle,
      this.sensors.target.heading
    );

    const planetArr = getPlanets(); //function to make the ship slow down
    const warpArr = getWarpGates();

    let target = 0;
    let dist = 0;

    if(warpArr.length == 0 ){
      dist = Math.sqrt(Math.pow(getShip().pos.x - planetArr[0].pos.x, 2) + Math.pow(getShip().pos.y - planetArr[0].pos.y, 2)); //Replace with given distance value
    }else{
      dist = Math.sqrt(Math.pow(getShip().pos.x - warpArr[0].pos.x, 2) + Math.pow(getShip().pos.y - warpArr[0].pos.y, 2)); //Replace with given distance value
    }
    // const target = totalArr[0];


    // const dist = 20;


    const distRate = dist - this.prevDist;

    var distOutput = 0;

    const KpDistOutput = dist * 1;
    const KdDistOutput = distRate * 300;

    distOutput = KpDistOutput + KdDistOutput;






    var headingOutput = 0;

    const headingDiffRate = currHeadingDiff - this.prevHeadingDiff; //Find "derivative" of error

    const KpHeadingOutput = currHeadingDiff * this.KpWHeading; //Calculate terms
    const KdHeadingOutput = headingDiffRate * this.KdWHeading;
    headingOutput = KpHeadingOutput + KdHeadingOutput;


    // console.log("OUTPUT: " + headingOutput);

    headingOutput = Math.min(Math.max(headingOutput, -100), 100);
    distOutput = Math.min(Math.max(distOutput, -100), 100);

    console.log("DO: " + distOutput)
    // console.log("GET: " + distRate)

    this.maxOutput = Math.max(this.maxOutput, Math.abs(headingOutput))

    if (headingOutput < 0) {
      setThruster('clockwise', Math.abs(headingOutput))
      setThruster('counterClockwise', 0)
    } else {
      setThruster('counterClockwise', Math.abs(headingOutput))
      setThruster('clockwise', 0)
    }
    // setThruster("main", Math.abs(currHeadingDiff) < 0.2 ? 30 : 0);


    if (Math.abs(currHeadingDiff) < Math.PI / 180 * 10) {
      if (distOutput < 0) {
        setThruster('main', 0)
        setThruster('bow', Math.abs(distOutput))
      } else {
        setThruster('main', Math.abs(distOutput))
        setThruster('bow', Math.abs(distOutput))
      }
    }

    this.prevHeadingDiff = currHeadingDiff;
    this.prevDist = dist;
  }
}
