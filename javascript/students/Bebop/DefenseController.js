import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    constructor() {
        super(...arguments);
        this.torpedoDelay = 0;
    }
    defenceUpdate(shipStatusInfo, aimTurret, getTubeCooldown, fireTorpedo) { }
}
