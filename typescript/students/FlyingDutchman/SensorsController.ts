import { withinPiRange, Vector2 } from '../helpers.js'
import SensorsController from '../../src/subsystems/sensorsController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import { EMSReading, PassiveReading } from '../types.js'

export type SpaceObject = {
  /**
   * Angle of the object relative to the space ship
   */
  angle: number;
  /**
   * Direction the object is facing
   */
  heading: number;
  distance: number;
  velocity: Vector2;
  mass: number;
  /**
   * Value between 0 and 1 which indicates how certain we are this object is [type]
   */
  certainty: number;
  type: 'Meteor' | 'Asteroid' | 'WarpGate' | 'Other'
}
export default class YourSensorsController extends SensorsController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	propulsion: YourPropulsionController //@ts-ignore
	target: PassiveReading | null = null 

	//Add additional attributes here
  scannedObjects: SpaceObject[] = [];

	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
		const scanResult = passiveScan()
		if (!(scanResult instanceof Error)) this.target = scanResult[0]
	}
}


// accurate vector coordinates (angle, distance) of warpgates and planets - navigation
// angle (from velocity), heading, velocity, distance of asteroids - defense

// passive scan - heading, mass/distance - warpgates accurate position, list of objects of certain planets + list of objects of uncertain planets 
// active scan - angle(heading), distance, velocity, radius
				// close range - type, habitability
