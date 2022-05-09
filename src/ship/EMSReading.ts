import Vector2 from "../helpers/Vector2";

export default class EMSReading{
	Angle: number;
	Amplitude: number;
	Velocity: Vector2;
	Radius: number;
	ScanSignature:object;
	SpecialInfo:string|null;
	constructor(angle:number, amplitude:number, velocity:Vector2, radius:number, scanSignature:object, specialInfo:string|null = null){
		this.Angle = angle; // The angle of the reading (relative to global X axis) //number
		this.Amplitude = amplitude; // The strength of the reading, proportional to distance via activeSensors.GConstant //number
		this.Velocity = velocity; // The velocity of the detected object relative to current solar system coordinate frame //Vector
		this.Radius = radius; // The collision radius of the detected object //number
		this.ScanSignature = scanSignature;// A more detail description of the object's material composition //object
		this.SpecialInfo = specialInfo;// For example, a Warp Gate's destination solar system name //string
	}
}