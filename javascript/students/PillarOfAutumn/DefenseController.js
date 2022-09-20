import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    //Add additional attributes here
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        //Student code goes here
        if (!this.sensors.target)
            return;
        aimTurret(this.sensors.target.heading);
        fireTorpedo(0);
        if (getTubeCooldown(0) < 25) {
            aimTurret(this.sensors.target.heading + 0.2);
            fireTorpedo(1);
        }
        if (getTubeCooldown(0) < 50) {
            aimTurret(this.sensors.target.heading + 0.4);
            fireTorpedo(2);
        }
        if (getTubeCooldown(0) < 75) {
            aimTurret(this.sensors.target.heading - 0.4);
            fireTorpedo(3);
        }
        else {
            fireTorpedo(4);
        }
    }
}
