import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    //Add additional attributes here
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        if (!this.sensors.target)
            return;
        if (this.sensors.closeRange != null && this.sensors.closeRange[0] != null && getTubeCooldown(0) == 0) {
            aimTurret(this.sensors.closeRange[0].angle);
            fireTorpedo(0);
        }
    }
}
