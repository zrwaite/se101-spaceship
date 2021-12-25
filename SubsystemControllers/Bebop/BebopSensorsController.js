//Based on BebopSensorsController.cs
import Vector2 from "../../src/helpers/Vector2.js";
import SubsystemController from "../../src/subsystemController.js";
export default class BebopSensorsController extends SubsystemController{
	constructor(...args){
    	super(...args);
		this.desiredPosition = new Vector2(5,5);
		this.timer = 0;
  	}
	
	/* To get ship information, use the following functions:
	  this.defence
	  this.navigation
	  this.propulsion
	  see SandBox/Scripts/Ship/README.md for an explanation of return values. (maybe, haven't added it yet)
	*/
	sensorsUpdate(shipStatusInfo, performActiveScan, performPassiveScan){
		//Student code goes here
		if (this.timer==200){
			//(heading, arc, range)
			let responses = performActiveScan(0, 1, 50).response
			// console.log(responses);
			responses.forEach((response) => {
				console.log(response);
				console.log(response.ScanSignature);
			});
		}
		this.timer++;
    }
}
