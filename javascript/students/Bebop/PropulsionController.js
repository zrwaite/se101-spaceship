import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    constructor() {
        super(...arguments);
        this.timer = 0;
        this.clockwise = 0;
        this.counterClockwise = 0;
    }
    propulsionUpdate(shipStatusInfo, setThrusters) { }
}
