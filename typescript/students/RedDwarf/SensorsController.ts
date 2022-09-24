import { withinPiRange, Vector2 } from "../helpers.js";
import SensorsController from "../../src/subsystems/sensorsController.js";
import YourDefenceController from "./DefenseController.js";
import YourNavigationController from "./NavigationController.js";
import YourPropulsionController from "./PropulsionController.js";
import { EMSReading, PassiveReading } from "../types.js";
import Sprite from "../../src/sprite.js";
import "./main.js";
let allObjects: object[] = []; // array of all objects in galaxy
// let activeScanObjects: Object[] = [];

// function isNumber(n: any) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

export default class YourSensorsController extends SensorsController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	propulsion: YourPropulsionController
	target: PassiveReading | null=null
	targetX: number = 0
	targetY: number = 0
	// activeScanTimer: number = 0
	// @ts-ignore
	// activeScanResult: EMSReading[] | Error

	//Add additional attributes here

	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
		const scanResult = passiveScan() //Passive Scan

		console.log("TARGET:" + this.targetX + ", " + this.targetY)

		if (!(scanResult instanceof Error)) {
			
			//Get result
			this.target = scanResult[0]



			//Active scan
			const activeScanResult = activeScan(this.target.heading, Math.PI/180 * 5, 900);
			
			if(!(activeScanResult instanceof Error)){
				//Get distance and angle
				var dist = activeScanResult[0].distance;
				var angle = activeScanResult[0].angle;

				//Use it to calc target position
				this.targetX = this.navigation.shipX + dist * Math.cos(angle);
				this.targetY = this.navigation.shipY + dist * Math.sin(angle);
				
			}





			

    // //   if (!this.target){
    //     // checks if scan object already exists in all Objects
	// 	// Two passive scans are started, so the positions of moving objects are
	// 	// different in each of the passsive scans.
	// 	// If a position recorded in both passive scans is the same,
    //     // that object is the planet
    //     allObjects.forEach(planet => {
    //       if(JSON.stringify(planet) == JSON.stringify(scanResult)){
    //         console.log("found the planet", scanResult[0])					
    //         this.target = scanResult[0] // sets target to planet
	// 		console.log("ALDKJSALDKJ")
    //       }
    //     });

	// 	allObjects.push(scanResult) // adds object to array
    //   }
	// // }

	// //else if found target
	// else{
	// 	const activeScanResult = activeScan(1, 3, 5)
	// 	// this.activeScanResult = activeScanResult;
	// 	if(!(activeScanResult instanceof Error)){
	// 		console.log(activeScanResult)
	// 		// activeScanObjects.push(activeScanResult);
	// 	}
	}
	}
}
