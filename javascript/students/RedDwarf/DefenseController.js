import DefenceController from "../../src/subsystems/defenceController.js";
export default class YourDefenceController extends DefenceController {
    // pulls defence data from sensors
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        //Student code goes here
        if (!this.sensors.target)
            return;
        aimTurret(this.sensors.target.heading);
        fireTorpedo(0);
    }
}
// my commit fr
