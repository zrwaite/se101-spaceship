import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    constructor() {
        super(...arguments);
        this.timeCounter = 0;
    }
    //Add additional attributes here
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        console.log("defense: " + this.sensors.asteroidHeading);
        if (this.sensors.asteroidHeading) {
            let i = 0;
            this.sensors.asteroidHeading.forEach((ast) => {
                if (i < 3) {
                    aimTurret(ast.angle);
                    fireTorpedo(i);
                    console.log(ast);
                    i++;
                }
                this.sensors.asteroidHeading = [];
            });
        }
        this.timeCounter++;
    }
}
