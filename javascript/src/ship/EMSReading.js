export default class EMSReading {
    constructor(angle, amplitude, velocity, radius, distance, scanSignature = undefined) {
        this.angle = angle; // The angle of the reading (relative to global X axis) //number
        this.amplitude = amplitude; // The strength of the reading
        this.velocity = velocity; // The velocity of the detected object relative to current solar system coordinate frame //Vector
        if (distance < 50) {
            this.closeRange = {
                radius: radius,
                scanSignature: scanSignature,
                distance: distance,
            };
        }
    }
}
