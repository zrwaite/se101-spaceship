import { withinPiRange, Vector2 } from '../helpers.js';
import SensorsController from '../../src/subsystems/sensorsController.js';
import YourDefenceController from './DefenseController.js';
import YourNavigationController from './NavigationController.js';
import YourPropulsionController from './PropulsionController.js';
import { EMSReading, PassiveReading } from '../types.js';
export default class YourSensorsController extends SensorsController {
  // To get other subsystem information, use the attributes below.
  // @ts-ignore
  defence: YourDefenceController; // @ts-ignore
  navigation: YourNavigationController; // @ts-ignore
  propulsion: YourPropulsionController;

  //Add additional attributes here
  // target: PassiveReading | null = null
  target: PassiveReading | null = null;
  defenseTarget: EMSReading | null = null;
  // info: EMSReading | null = null

  sensorsUpdate(
    activeScan: (
      heading: number,
      arc: number,
      range: number
    ) => EMSReading[] | Error,
    passiveScan: () => PassiveReading[] | Error
  ) {
    const passiveScanResult = passiveScan();
    const activeScanResult = activeScan(
      this.navigation.angle - Math.PI / 4,
      Math.PI / 2,
      100
    );

    if (!(passiveScanResult instanceof Error))
      this.target = passiveScanResult[0];
    // if(!(activeScanResult instanceof Error )) this.info = activeScanResult[0];

    if (!(activeScanResult instanceof Error) && activeScanResult.length > 0) {
      const badTargets = activeScanResult.filter(
        (object) =>
          object.closeRange &&
          (object.closeRange.type === 'Asteroid' ||
            object.closeRange.type === 'Meteor')
      );

      badTargets.sort(
        (objectA, objectB) => objectA.distance - objectB.distance
      );

      this.defenseTarget = badTargets[0];
    } else {
      this.defenseTarget = null;
    }

    // this.defenseTarget;
    // console.log(activeScanResult);
  }
}
