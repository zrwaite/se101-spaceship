export default class EMSReading{
	Angle;
	Amplitude;
	Velocity;
	Radius;
	ScanSignature;
	SpecialInfo;
	constructor(angle, ampltitude, velocity, radius, scanSignature, specialInfo = null){
		this.Angle = angle; // The angle of the reading (relative to global X axis) //number
		this.Amplitude = ampltitude; // The strength of the reading, proportional to distance via activeSensors.GConstant //number
		this.Velocity = velocity; // The velocity of the detected object relative to current solar system coordinate frame //Vector
		this.Radius = radius; // The collision radius of the detected object //number
		this.ScanSignature = scanSignature;// A more detail description of the object's material composition //object
		this.SpecialInfo = specialInfo;// For example, a Warp Gate's destination solar system name //string
	}
}