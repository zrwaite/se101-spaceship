//Based on EMSReading.cs

export default class ShipStatusInfo{
	constructor(){
		this.currentSystemName; //The name of the solar system the ship is currently travelling within //string
		this.positionWithinSystem; //  The ship's position relative to the center of the current solar system //Vector2
		this.shipCollisionRadius; // How radius of the ship as approximated by a circle //number
		this.linearVelocity; // What direction and how fast the ship is travelling within the current solar system //Vector2
		this.angularVelocity; //How quickly the ship is rotating // number
		this.forwardVector;//A vector (in solar system coordinate space) pointing forward along the ship's bow //Vector 2
		this.rightVector;// A vector (in solar system coordinate space) pointing directly starboard //Vector2
		this.torpedoSpeed; // How fast torpedoes will travel when launched //number
		this.hasLanded; //A flag indicated whether the ship has successfully landed //Boolean
	}
	ShipStatusInfo( currentSystemName, positionWithinSystem, shipCollisionRadius, linearVelocity, angularVelocity, forwardVector, rightVector, torpedoSpeed, hasLanded){
        this.currentSystemName = currentSystemName;
        this.positionWithinSystem = positionWithinSystem;
        this.shipCollisionRadius = shipCollisionRadius;
        this.linearVelocity = linearVelocity;
        this.angularVelocity = angularVelocity;
        this.forwardVector = forwardVector;
        this.rightVector = rightVector;
        this.torpedoSpeed = torpedoSpeed;
        this.hasLanded = hasLanded;
    }
	HandleWarpJumpCompleted(newSystemName){
		this.currentSystemName = newSystemName;
    }
}