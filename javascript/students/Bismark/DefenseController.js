import DefenceController from "../../src/subsystems/defenceController.js";
export default class YourDefenceController extends DefenceController {
    //Add additional attributes here
    // Dy = t(Vy + 3sin(O))
    // Dx = t(Vx - 3cos(O))
    // solve for O, to find angle of shooting
    // Dy = (Dx*Vy + Dx*3sin(O)) / (Vx - 3cos(O))
    // https://stackoverflow.com/questions/2248876/2d-game-fire-at-a-moving-target-by-predicting-intersection-of-projectile-and-u
    // Dy*Vx - 3*Dy*cos(O) = Dx*Vy + 3*Dx*sin(O)
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        var _a;
        let objects = (_a = this.sensors.activeScan) === null || _a === void 0 ? void 0 : _a.filter((r) => r.distance < 200 && (r.radius === 5 || r.radius === 15));
        if (!objects)
            return;
        for (let i = 0; i < 4; i++) {
            const target = objects === null || objects === void 0 ? void 0 : objects[i];
            if (target) {
                aimTurret(target.angle);
                if (getTubeCooldown(i) === 0) {
                    fireTorpedo(i);
                }
            }
        }
    }
}
