import { withinPiRange, Vector2 } from "../helpers.js";
import SensorsController from "../../src/subsystems/sensorsController.js";
import YourDefenceController from "./DefenseController.js";
import YourNavigationController from "./NavigationController.js";
import YourPropulsionController from "./PropulsionController.js";
import { EMSReading, PassiveReading } from "../types.js";

let allObjects: object[] = [];

export default class YourSensorsController extends SensorsController {
<<<<<<< HEAD
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	propulsion: YourPropulsionController
	target: PassiveReading | null=null

	//Add additional attributes here
	
	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
		const scanResult = passiveScan()
		if (!(scanResult instanceof Error)) this.target = scanResult[0]
		//this is a test
	}
=======
  // To get other subsystem information, use the attributes below.
  // @ts-ignore
  defence: YourDefenceController; // @ts-ignore
  navigation: YourNavigationController; // @ts-ignore
  propulsion: YourPropulsionController;
  target: PassiveReading | null = null;

  //Add additional attributes here

  sensorsUpdate(
    activeScan: (
      heading: number,
      arc: number,
      range: number
    ) => EMSReading[] | Error,
    passiveScan: () => PassiveReading[] | Error
  ) {
    const scanResult = passiveScan();

    if (!(scanResult instanceof Error)) {
      console.log("here is passive scan", scanResult);

      console.log("all objects");
      console.log(allObjects);

      allObjects.forEach((v) => {
        if (JSON.stringify(v) == JSON.stringify(scanResult)) {
          console.log("found the planet");
          console.log(scanResult);
          this.target = scanResult[0];
        }
      });

      allObjects.push(scanResult);
    }
  }
>>>>>>> ade4b6e74f94ebf05f6e32733d3a1512b647ec53
}
