import DefenceController from "../../src/subsystems/defenceController.js";
export default class YourDefenceController extends DefenceController {
    // Add additional attributes here
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        if (!this.sensors.target)
            return;
        aimTurret(this.sensors.target.heading);
        fireTorpedo(0);
        if (!this.sensors.shootingTarget)
            return;
        aimTurret(this.sensors.shootingTarget);
        fireTorpedo(0);
    }
}
