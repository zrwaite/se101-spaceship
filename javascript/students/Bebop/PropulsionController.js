import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    constructor() {
        super(...arguments);
        this.timer = 0;
        this.postAftThrusterLevel = 0;
        this.starboardAftThrusterLevel = 0;
    }
    propulsionUpdate(shipStatusInfo, setThrusters) {
        // if (this.sensors) {
        // 	if (shipStatusInfo.angle > this.sensors.idealHeading) {
        // 		this.postAftThrusterLevel += 10
        // 		this.starboardAftThrusterLevel = 0
        // 	} else {
        // 		this.postAftThrusterLevel = 0
        // 		this.starboardAftThrusterLevel += 10
        // 	}
        // 	setThrusters('portAftThruster', this.postAftThrusterLevel)
        // 	setThrusters('starboardAftThruster', this.starboardAftThrusterLevel)
        // 	if (shipStatusInfo.linearVelocity.magnitude() < 1) {
        // 		setThrusters('mainThruster', 100)
        // 	}
        // }
        // console.log(this.postAftThrusterLevel + ", " + this.starboardAftThrusterLevel)
        // setThrusters('main', 100)
        //Student code goes here
    }
}
