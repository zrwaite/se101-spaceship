import DefenceController from '../../src/subsystems/defenceController.js';
export default class YourDefenceController extends DefenceController {
    //Add additional attributes here
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        //Student code goes here
        if (!this.sensors.target)
            return;
        if (this.sensors.activeArray.length > 0) {
            for (let i = 0; i < this.sensors.activeArray.length; i++) {
                if (!(this.sensors.activeArray[i]))
                    continue;
                aimTurret(this.sensors.activeArray[i].angle);
                fireTorpedo(i % 4);
            }
        }
        /**
        if (this.sensors.activeArray.length>0){
            for (let i =0; i<this.sensors.activeArray.length; i++ ){
                    if(!(this.sensors.activeArray[i])) continue
                    let a = (3*this.sensors.activeArray[i].distance) * Math.cos(this.sensors.activeArray[i].angle)
                    let b = (3*this.sensors.activeArray[i].distance) * Math.sin(this.sensors.activeArray[i].angle)
                    let c = (this.sensors.activeArray[i].distance) * Math.sin(this.sensors.activeArray[i].angle)*()
                    fireTorpedo(i%4)
            }
        }
        **/
    }
}
8;
