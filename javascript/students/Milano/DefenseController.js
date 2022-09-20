import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    //Add additional attributes here
<<<<<<< HEAD
    defenceUpdate() {
        if (this.sensors.target)
=======
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        if (!this.sensors.target)
>>>>>>> 2394104272e8ecb39d0e4c9e35064c4dd6a1adad
            return;
        aimTurret(this.sensors.target.heading);
        fireTorpedo(0);
    }
}
