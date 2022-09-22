import DefenceController from "../../src/subsystems/defenceController.js";
export default class YourDefenceController extends DefenceController {
    //Add additional attributes here
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        //Student code goes here
        if (!this.sensors.target)
            return;
        aimTurret(this.sensors.target.heading);
        fireTorpedo(0);
    }
}
