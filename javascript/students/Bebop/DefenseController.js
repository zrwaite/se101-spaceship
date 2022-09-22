import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    //Add additional attributes here
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        if (!this.sensors.target)
            return;
        let array = [];
        aimTurret(array[0]);
        if (this.sensors.activeScanData != null) {
            for (let i = 0; i < this.sensors.activeScanData.length; i++) {
                if (this.sensors.activeScanData[i].closeRange) {
                    if (getTubeCooldown(0) == 0) {
                        aimTurret(this.sensors.activeScanData[0].angle);
                        fireTorpedo(0);
                    }
                    else if (getTubeCooldown(1) == 0) {
                        aimTurret(this.sensors.activeScanData[0].angle);
                        fireTorpedo(1);
                    }
                    else if (getTubeCooldown(2) == 0) {
                        aimTurret(this.sensors.activeScanData[0].angle);
                        fireTorpedo(2);
                    }
                    else if (getTubeCooldown(3) == 0) {
                        aimTurret(this.sensors.activeScanData[0].angle);
                        fireTorpedo(3);
                    }
                }
            }
        }
    }
}
