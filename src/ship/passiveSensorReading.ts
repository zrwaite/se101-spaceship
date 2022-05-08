export default class PassiveSensorReading {
    Heading;
    Signature;
    constructor(angle:number, signature:number){
        this.Heading = angle; //number
        this.Signature = signature; //GravitySignature;
    }
}
