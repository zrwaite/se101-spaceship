import { withinPiRange, Vector2 } from '../helpers.js'
import SensorsController from '../../src/subsystems/sensorsController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import { EMSReading, PassiveReading } from '../types.js'
import { couldStartTrivia } from '../../../node_modules/typescript/lib/typescript.js'
export default class YourSensorsController extends SensorsController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	propulsion: YourPropulsionController
	
	//Add additional attributes here
	target: PassiveReading | null=null;
	landTarget: PassiveReading | null=null;

  	collisionCheck(targetX: number, targetY: number, selfVelocity: Vector2, targetVelocity: Vector2): boolean {
		return false;
	}

	cartesian(angle: number, distance: number): number[] {
		// Given angle and distance of an object, return x,y cords assuming ship pos is 0,0
		return [distance*Math.cos(angle), distance*Math.sin(angle)]

	} 

	polar(x: number, y: number): number[]{
		// Given x,y coords assuming ship pos is 0,0, return [angle (in radians), distance]
		return [Math.sqrt(x*x + y*y), Math.atan(y/x)]
	}

	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
		//Student code goes here
		const scanResult = passiveScan();
		
		if(!(scanResult instanceof Error)) {
			this.target = scanResult[0];
	
		}
	}
}
