import NavigationController from "../../src/subsystems/navigationController.js";
export default class YourNavigationController extends NavigationController {
    constructor() {
        super(...arguments);
        /* To get other subsystem information, use the following functions:
        this.defence
        this.propulsion
        this.sensors
        see SandBox/Scripts/Ship/README.md for an explanation of return values.
        */
        this.timer = 0;
    }
    navigationUpdate(shipStatusInfo, warp, mapData) {
        this.timer++;
        if (!(this.timer % 100))
            console.log(shipStatusInfo);
        //Student code goes here
    }
}
