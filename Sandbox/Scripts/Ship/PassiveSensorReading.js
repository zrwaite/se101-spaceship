//Based on PassiveSensorReading.cs
export default class PassiveSensorReading {
    constructor(){
        this.ContactID; //number
        this.Heading; //number
        this.Signature; //GravitySignature;
    }
    PassiveSensorReading(contactID, angle, signature){
        this.ContactID = contactID;
        this.Heading = angle;        
        this.Signature = signature;
    }
}
