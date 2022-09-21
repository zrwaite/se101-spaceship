import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    //Add additional attributes here
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        //Student code goes here
        if (!this.sensors.target)
            return;
        /*
        if (this.sensors.activeArray.length>0){
            for (let i =0; i<this.sensors.activeArray.length; i++ ){
                    if(!(this.sensors.activeArray[i])) continue
                    aimTurret(this.sensors.activeArray[i].angle)
                    fireTorpedo(i%4)
            }
        }
        */
        if (this.sensors.activeArray.length > 0) {
            for (let i = 0; i < this.sensors.activeArray.length; i++) {
                if (!(this.sensors.activeArray[i]))
                    continue;
                let dxa = this.sensors.activeArray[i].distance * Math.cos(this.sensors.activeArray[i].angle);
                let vxa = this.sensors.activeArray[i].velocity.x;
                let dya = this.sensors.activeArray[i].distance * Math.sin(this.sensors.activeArray[i].angle);
                let vya = this.sensors.activeArray[i].velocity.y;
                let a = (3 * dxa);
                let b = (3 * dya);
                let c = (dya * (this.navigation.xVelocity - vxa) - dxa * (this.navigation.yVelocity - vya));
                let torpedoAngle = 0;
                if ((Math.cos(this.sensors.activeArray[i].angle) >= 0) && (Math.sin(this.sensors.activeArray[i].angle) >= 0)) {
                    torpedoAngle = Math.atan(c / (Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2)))) - Math.atan(a / b) + Math.PI / 2;
                }
                else if ((Math.cos(this.sensors.activeArray[i].angle) >= 0) && (Math.sin(this.sensors.activeArray[i].angle) <= 0)) {
                    torpedoAngle = Math.atan(c / (Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2)))) - Math.atan(a / b) - Math.PI / 2;
                }
                else if (((Math.cos(this.sensors.activeArray[i].angle) <= 0) && (Math.sin(this.sensors.activeArray[i].angle) >= 0))) {
                    torpedoAngle = Math.atan(c / (Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2)))) - Math.atan(a / b) + Math.PI / 2;
                }
                else {
                    torpedoAngle = Math.atan(c / (Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2) + Math.pow(c, 2)))) - Math.atan(a / b) - Math.PI / 2;
                }
                aimTurret(torpedoAngle);
                fireTorpedo(i % 4);
            }
        }
    }
}
8;
