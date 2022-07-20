export default class EMSReading {
    constructor(angle, velocity, radius, distance, scanSignature = undefined) {
        this.angle = angle; // The angle of the reading (relative to global X axis) //number
        this.velocity = velocity; // The velocity of the detected object relative to current solar system coordinate frame //Vector
        this.distance = distance;
        this.radius = radius; // The collision radius of the detected object //number
        if (distance < 100) {
            this.closeRange = {
                scanSignature: scanSignature, // A more detail description of the object's material composition //object
            };
        }
    }
}
