import DefenceController from "../../src/subsystems/defenceController.js";
import { Vector2, withinPiRange, angleDiff } from "../helpers.js";
import YourNavigationController from "./NavigationController.js";
import YourPropulsionController from "./PropulsionController.js";
import YourSensorsController from "./SensorsController.js";
export default class YourDefenceController extends DefenceController {
  // To get other subsystem information, use the attributes below.
  // @ts-ignore
  navigation: YourNavigationController; // @ts-ignore
  sensors: YourSensorsController; // @ts-ignore
  propulsion: YourPropulsionController;
  //Add additional attributes here
  // Dy = t(Vy + 3sin(O))
  // Dx = t(Vx - 3cos(O))
  // solve for O, to find angle of shooting
  // Dy = (Dx*Vy + Dx*3sin(O)) / (Vx - 3cos(O))
  // https://stackoverflow.com/questions/2248876/2d-game-fire-at-a-moving-target-by-predicting-intersection-of-projectile-and-u
  // Dy*Vx - 3*Dy*cos(O) = Dx*Vy + 3*Dx*sin(O)
  defenceUpdate(
    aimTurret: (angle: number) => void,
    getTubeCooldown: (i: number) => number | Error,
    fireTorpedo: (i: number) => Error | null
  ) {
    let objects = this.sensors.activeScan?.filter(
      (r) => r.distance < 200 && (r.radius === 5 || r.radius === 15)
    );
    if (!objects) return;

    for (let i = 0; i < 4; i++) {
      const target = objects?.[i];
      if (target) {
        aimTurret(target.angle);
        if (getTubeCooldown(i) === 0) {
          fireTorpedo(i);
        }
      }
    }
  }
}
