//Based on EMSReading.cs

export default class EMSReading{
	constructor(){
		this.ContactID; //For keeping track of the same object each scan
		this.Angle; // The angle of the reading (relative to global X axis)
		this.Amplitude; // The strength of the reading, proportional to distance via activeSensors.GConstant
		this.Velocity; // The velocity of the detected object relative to current solar system coordinate frame
		this.Radius; // The collision radius of the detected object
		this.ScanSignature;// A more detail description of the object's material composition
		this.SpecialInfo;// For example, a Warp Gate's destination solar system name
	}
	EMSReading( contactID, angle, ampltitude, velocity, radius, scanSignature, specialInfo = null){
        this.ContactID = contactID;
        this.Angle = angle;
        this.Amplitude = ampltitude;
        this.Velocity = velocity;
        this.Radius = radius;
        this.ScanSignature = scanSignature;
        this.SpecialInfo = specialInfo;
    }
}