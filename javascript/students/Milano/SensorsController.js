import SensorsController from '../../src/subsystems/sensorsController.js';
export default class YourSensorsController extends SensorsController {
    constructor() {
        super(...arguments);
<<<<<<< HEAD
=======
        //Add additional attributes here
>>>>>>> 0506b4a (adding more comments)
        this.target = null;
    }
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error))
            this.target = scanResult[0];
<<<<<<< HEAD
=======
        // kieran added this line
        // kieran also added this line
        // not kieran - Hamza
        // Daniel added to this line 
>>>>>>> 0506b4a (adding more comments)
    }
}
