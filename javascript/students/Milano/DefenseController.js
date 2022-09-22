import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    //Add additional attributes here
<<<<<<< HEAD
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        if (!this.sensors.target)
=======
    defenceUpdate() {
        if (this.sensors.target)
>>>>>>> 0506b4a (adding more comments)
            return;
        console.log(this.sensors.target.gravity);
        aimTurret(this.sensors.target.heading);
        fireTorpedo(0);
    }
}
