import { withinPiRange } from '../../src/helpers/Angles.js';
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
        //Student code goes here
        this.timer++;
        if (this.timer % 100 == 0) {
            let startAngle = withinPiRange(shipStatusInfo.angle - Math.PI / 4);
            let arc = Math.PI / 2;
            // let startAngle = Math.PI / 2
            // let arc = Math.PI
            let res = activeScan(startAngle, arc, 200);
            res.response.forEach((obj) => { });
        }
    }
}
