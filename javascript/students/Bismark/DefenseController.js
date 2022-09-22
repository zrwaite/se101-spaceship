import DefenceController from "../../src/subsystems/defenceController.js";
export default class YourDefenceController extends DefenceController {
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        if (!this.sensors.target)
            return;
        // if(this.sensors.target.heading < 1){
        aimTurret(this.sensors.target.heading);
        fireTorpedo(0);
        console.log(this.sensors.target.heading);
        // }
    }
}
