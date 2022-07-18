export default class PassiveSensorReading {
    heading;
    gravity;
    constructor(angle:number, signature:number){
        this.heading = angle; //number
        this.gravity = signature; //GravitySignature;
    }
}
