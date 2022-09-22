import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    constructor() {
        super(...arguments);
        //Add additional attributes here
        this.torpedoTargets = [];
    }
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        aimTurret(this.torpedoTargets[0]);
        if (!this.sensors.target)
            return;
        if (this.sensors.activeScanData != null && this.sensors.activeScanData[0] != null) {
            for (let i = 0; i < this.sensors.activeScanData.length; i++) {
                this.torpedoTargets.push(this.sensors.activeScanData[i].angle);
            }
        }
        for (let i = 0; i < 4; i++) {
            const target = this.torpedoTargets[0];
            if (getTubeCooldown(i) == 0) {
                aimTurret(target);
                fireTorpedo(i);
                this.torpedoTargets.shift();
            }
        }
        this.torpedoTargets = [];
    }
}
