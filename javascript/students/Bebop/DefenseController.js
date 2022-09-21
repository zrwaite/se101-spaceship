import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    //Add additional attributes here
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        if (!this.sensors.target)
            return;
        if (this.sensors.activeScanData != null && this.sensors.activeScanData[0] != null && getTubeCooldown(0) == 0) {
            aimTurret(this.sensors.activeScanData[0].angle);
            fireTorpedo(0);
        }
    }
}
