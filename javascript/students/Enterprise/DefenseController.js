import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    //Add additional attributes here
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        const closeRangeObject = this.sensors.closeRangeObject;
        //Student code goes here
        if (!this.sensors.targets)
            return;
        //auto shoot when cooldown is done
        closeRangeObject && closeRangeObject.forEach(object => {
            if (object === null || object === void 0 ? void 0 : object.closeRange) {
                if (object.closeRange.type === "Asteroid") {
                    fireTorpedoFunc(object = object, 0);
                    fireTorpedoFunc(object = object, 1);
                    fireTorpedoFunc(object = object, 2);
                    fireTorpedoFunc(object = object, 3);
                    fireTorpedoFunc(object = object, 4);
                    fireTorpedoFunc(object = object, 5);
                }
            }
        });
        // function for firing torpedo
        function fireTorpedoFunc(object, val) {
            console.log(val);
            if (getTubeCooldown(val) == 0) {
                if (object.angle != null) {
                    aimTurret(object.angle);
                    fireTorpedo(val);
                }
            }
        }
    }
}
