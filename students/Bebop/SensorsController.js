import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
        /* To get other subsystem information, use the following functions:
        this.defence
        this.navigation
        this.propulsion
        see SandBox/Scripts/Ship/README.md for an explanation of return values. (maybe, haven't added it yet)
        */
        this.timer = 0;
    }
    sensorsUpdate(shipStatusInfo, activeScan, passiveScan) {
        this.timer++;
        if (this.timer % 100 == 0) {
            console.log(passiveScan());
        }
        //Student code goes here
    }
}
