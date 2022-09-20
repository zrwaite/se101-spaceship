import { withinPiRange, Vector2 } from '../helpers.js'
import SensorsController from '../../src/subsystems/sensorsController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import { EMSReading, PassiveReading } from '../types.js'

export default class YourSensorsController extends SensorsController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	propulsion: YourPropulsionController
	
	//Add additional attributes here
	target: PassiveReading | null=null;
	landTarget: Vector2 | null=null;

  	collisionCheck(targetX: number, targetY: number, selfVelocity: Vector2, targetVelocity: Vector2): boolean {

		return false;
	}
	cartesian(angle: number, distance: number): Vector2 {
		// Given angle and distance of an object, return x,y cords assuming ship pos is 0,0
		return new Vector2(distance*Math.cos(angle), distance*Math.sin(angle))

 	} 

 	polar(x: number, y: number): Vector2{
 		// Given x,y coords assuming ship pos is 0,0, return [angle (in radians), distance]
 		return new Vector2(Math.sqrt(x*x + y*y), Math.atan(y/x))
 	}

 	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
 		//Student code goes here
 		const scanResult = passiveScan();
		
		this.landTarget = new Vector2(360,270)

		if(!(scanResult instanceof Error)) {
			this.target = scanResult[0];
			for(let i=0; i<scanResult.length; i++){
				const ems = activeScan(scanResult[i].heading,0.1,680)
				if(!(ems instanceof Error)) {
					for(let j=0; i<ems.length; i++){
						if(ems[j].distance>0 && ems[j].radius<=45 && ems[j].radius>=25){
							this.landTarget = this.cartesian(ems[j].angle, ems[j].distance)
						}
					}
				}
			}
		}
	}
}