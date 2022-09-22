import { withinPiRange, Vector2 } from "../helpers.js";
import SensorsController from "../../src/subsystems/sensorsController.js";
import YourDefenceController from "./DefenseController.js";
import YourNavigationController from "./NavigationController.js";
import YourPropulsionController from "./PropulsionController.js";
import { EMSReading, PassiveReading } from "../types.js";
import { CloseRangeData } from "../../src/ship/EMSReading.js";
<<<<<<< HEAD
import { buildShip } from "../../src/ship/buildShip.js";
import ColonyShip from "../../src/ship/colonyShip.js";
import ActiveSensors from "../../src/ship/activeSensors.js";
=======
import Planet from "../../src/spaceObjects/planet.js";
>>>>>>> cc94e28ca7624b7186f5ffb057b9a19f5df7589a
export default class YourSensorsController extends SensorsController {
  // To get other subsystem information, use the attributes below.
  // @ts-ignore
  defence: YourDefenceController; // @ts-ignore
  navigation: YourNavigationController; // @ts-ignore
  propulsion: YourPropulsionController;

  target: PassiveReading | undefined;
  shootingTarget?: number;
  targetDetails: EMSReading | undefined;
  activeScan: EMSReading[] | undefined;
  EMSAngle: EMSReading[] | undefined;
  EMSDist: EMSReading[] | undefined;
  EMSVel: EMSReading[] | undefined;
  EMSRad: EMSReading[] | undefined;
  EMSCLD: EMSReading[] | undefined;

  onTarget: Boolean | undefined;

  sensorsUpdate(
    activeScan: (
      heading: number,
      arc: number,
      range: number,
    ) => EMSReading[] | Error,
    passiveScan: () => PassiveReading[] | Error
  ) {
    if (this.navigation.angle === undefined) return;
    if (this.navigation.linearVelocityY === undefined) return;
    if (this.navigation.linearVelocityX === undefined) return;
    
     //check if ships velocity is moving towards the target
     var VAngle = Math.atan(this.navigation.linearVelocityY / this.navigation.linearVelocityX);
     if(this.target != undefined && (VAngle < this.target.heading - 0.5 || VAngle > this.target.heading + 0.5)){
     this.onTarget = true;
     }

    const scanResult = passiveScan();
    if (!(scanResult instanceof Error)) this.target = scanResult[0];

<<<<<<< HEAD
    const activeScanResult = activeScan(this.navigation.angle - Math.PI / 8, Math.PI, 100);

=======
    const activeScanResult = activeScan(
      this.navigation.angle - Math.PI / 2,
      Math.PI,
      250
    );
>>>>>>> cc94e28ca7624b7186f5ffb057b9a19f5df7589a
    if (!(activeScanResult instanceof Error)) {
      this.targetDetails = activeScanResult.find(
        (r) => r.angle === this.target?.heading
        
      );
      
      console.log(this.targetDetails)

      this.activeScan = activeScanResult.sort(
        (r1, r2) => r1.distance - r2.distance
      );

      if(activeScanResult.length > 0)this.shootingTarget = activeScanResult[0].angle;
      

    }

    const CloseRangeData = ActiveSensors.arguments.scan;
  }
}
