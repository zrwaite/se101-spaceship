import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    constructor() {
        super(...arguments);
        this.torpedoDelay = 0;
    }
    defenceUpdate(shipStatusInfo, aimTurret, getTubeCooldown, fireTorpedo) {
        var _a;
        if ((_a = this.sensors) === null || _a === void 0 ? void 0 : _a.asteroidAhead) {
            aimTurret(this.sensors.asteroidDirection);
            if (this.torpedoDelay === 0) {
                for (let i = 0; i < 4; i++) {
                    let tubeCooldown = getTubeCooldown(i);
                    if (tubeCooldown.response === 0) {
                        fireTorpedo(i);
                        this.torpedoDelay = 20;
                        break;
                    }
                }
            }
            else
                this.torpedoDelay--;
        }
    }
}
