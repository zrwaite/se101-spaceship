import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    constructor() {
        super(...arguments);
        /* To get other subsystem information, use the following functions:
        this.defence
        this.navigation
        this.sensors
        see SandBox/Scripts/Ship/README.md for an explanation of return values.
        */
        this.timer = 0;
    }
    propulsionUpdate(shipStatusInfo, setThrusters) {
        //Student code goes here
    }
}
