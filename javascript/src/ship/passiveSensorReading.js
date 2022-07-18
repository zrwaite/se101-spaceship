export default class PassiveSensorReading {
    constructor(angle, signature) {
        this.heading = angle; //number
        this.gravity = signature; //GravitySignature;
    }
}
