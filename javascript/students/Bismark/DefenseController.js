import DefenceController from "../../src/subsystems/defenceController.js";
export default class YourDefenceController extends DefenceController {
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        if (!this.sensors.target)
            return;
       else{
           aimTurret(this.sensors.target.heading);
           fireTorpedo(0);
       }
    }
}
