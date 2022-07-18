import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    constructor() {
        super(...arguments);
        this.timer = 0;
        this.clockwise = 0;
        this.counterClockwise = 0;
    }
    propulsionUpdate(shipStatusInfo, setThrusters) {
        if (this.sensors) {
            console.log(shipStatusInfo.angle, this.sensors.idealHeading);
            if (shipStatusInfo.angle < this.sensors.idealHeading) {
                this.clockwise = 10;
                this.counterClockwise = 0;
            }
            else {
                this.clockwise = 0;
                this.counterClockwise = 10;
            }
            setThrusters('clockwise', this.clockwise);
            setThrusters('counterClockwise', this.counterClockwise);
            if (shipStatusInfo.linearVelocity.magnitude() < 1) {
                setThrusters('main', 20);
            }
        }
        // console.log(this.clockwise + ', ' + this.counterClockwise)
        // setThrusters('clockwise', 100)
        //Student code goes here
    }
}
