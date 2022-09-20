import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    //Add additional attributes here
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        const closeRangeObject = this.sensors.closeRangeObject;
        //Student code goes here
        if (!this.sensors.target)
            return;
        //auto shoot when cooldown is done
        closeRangeObject && closeRangeObject.forEach(object => {
            if (object === null || object === void 0 ? void 0 : object.closeRange) {
                if (object.closeRange.type === "Asteroid") {
                    if (getTubeCooldown(0) == 0) {
                        if (object.angle != null) {
                            aimTurret(object.angle);
                            fireTorpedo(0);
                        }
                    }
                    if (getTubeCooldown(1) == 0) {
                        if (object.angle != null) {
                            aimTurret(object.angle);
                            fireTorpedo(1);
                        }
                    }
                    if (getTubeCooldown(2) == 0) {
                        if (object.angle != null) {
                            aimTurret(object.angle);
                            fireTorpedo(2);
                        }
                    }
                    if (getTubeCooldown(3) == 0) {
                        if (object.angle != null) {
                            aimTurret(object.angle);
                            fireTorpedo(3);
                        }
                    }
                }
            }
        });
    }
}
