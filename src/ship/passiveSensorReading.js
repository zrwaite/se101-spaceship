export default class PassiveSensorReading {
    Heading;
    Signature;
    constructor(angle, signature){
        this.Heading = angle; //number
        this.Signature = signature; //GravitySignature;
    }
}
