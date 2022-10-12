import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.lastTarget = 0; // remember last heading to determine if we have the same heading for 
    }
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        //Student code goes here
        if (!this.sensors.target)
            return;
        if (Math.abs(this.lastTarget - this.sensors.target.heading) > 0.05) { // only attempt to aim and shoot if heading 
            // for each Tube, check if they are ready to shoot (cooldown==0)
            if (getTubeCooldown(0) == 0) {
                aimTurret(this.sensors.target.heading);
                fireTorpedo(0);
            }
            else if (getTubeCooldown(1) == 0) {
                aimTurret(this.sensors.target.heading);
                fireTorpedo(1);
            }
            else if (getTubeCooldown(2) == 0) {
                aimTurret(this.sensors.target.heading);
                fireTorpedo(2);
            }
            else if (getTubeCooldown(3) == 0) {
                aimTurret(this.sensors.target.heading);
                fireTorpedo(3);
            }
            else if (getTubeCooldown(4) == 0) {
                aimTurret(this.sensors.target.heading);
                fireTorpedo(4);
            }
            //set lastTarget to currently heading
            this.lastTarget = this.sensors.target.heading;
        }
    }
}
