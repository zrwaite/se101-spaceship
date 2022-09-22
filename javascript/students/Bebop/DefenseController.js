import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    //Add additional attributes here
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        if (!this.sensors.target)
            return;
        if (getTubeCooldown(0) == 0) {
            aimTurret(this.sensors.target.heading);
            fireTorpedo(0);
        }
    }
}
