export default class EMSReading {
    constructor(angle, amplitude, velocity, radius, scanSignature = undefined, specialInfo = null) {
        this.Angle = angle; // The angle of the reading (relative to global X axis) //number
        this.Amplitude = amplitude; // The strength of the reading, proportional to distance via activeSensors.GConstant //number
        this.Velocity = velocity; // The velocity of the detected object relative to current solar system coordinate frame //Vector
        this.Radius = radius; // The collision radius of the detected object //number
        this.ScanSignature = scanSignature; // A more detail description of the object's material composition //object
        this.SpecialInfo = specialInfo; // For example, a Warp Gate's destination solar system name //string
    }
}
