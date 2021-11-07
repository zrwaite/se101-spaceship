import Vector2 from "../Helpers/Vector2";
//NEED TO IMPORT THRUSTER

class ThrusterControls {
	constructor(mainThruster, portRetroThruster, starboardRetroThruster, portForeThruster, portAftThruster, starboardForeThruster, starboardAftThruster){
		this.mainThruster = mainThruster; 
		this.portRetroThruster = portRetroThruster; 
		this.starboardRetroThruster = starboardRetroThruster; 
		this.portForeThruster = portForeThruster; 
		this.portAftThruster = portAftThruster; 
		this.starboardForeThruster = starboardForeThruster;
		this.starboardAftThruster = starboardAftThruster;
		this.mainThrottle; 
		this.portRetroThrottle; 
		this.starboardRetroThrottle; 
		this.portForeThrottle; 
		this.portAftThrottle; 
		this.starboardForeThrottle;
		this.starboardAftThrottle;
		this.torpedoSpeed; 
		this.hasLanded; 
		this.isUFODriveEnabled;
		this.UFODriveVelocity;
		this.UFODriveAngularVelocity;
	}
}	