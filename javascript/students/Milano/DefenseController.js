import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    //Add additional attributes here
    defenceUpdate() {
        if (this.sensors.target)
            return;
        aimTurret(this.sensors.target.heading);
        fireTorpedo(0);
    }
}
