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
  heading?: number;
  distance?: number;
  velocity?: Vector2;
  mass?: number;
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

	public get warpgatesOrPlanets() {
		return this.scannedObjects.filter((so) => ['Other', "WarpGate"].includes(so.type));
	}

  public get asteroids() {
    return this.scannedObjects.filter((so) => "Asteroid" == so.type);
  }

	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
		const scanResult = passiveScan()
		if ((scanResult instanceof Error)) return;
		
		this.scannedObjects = scanResult.map((reading) => {

			let type: 'Meteor' | 'Asteroid' | 'WarpGate' | 'Other' = 'Other'
			let certainty = 0.5
			let distance: number | undefined = undefined;
			let mass: number | undefined = undefined;

			if (reading.gravity < 0){
				type = 'WarpGate'
				certainty = 1
			} else if (reading.gravity < 1){
				type = 'Asteroid'
				mass = 5
				distance = reading.gravity / mass
			}
			
			return {
				angle: reading.heading, 
				type,
				certainty,
				mass,
				distance,
			}
		})

		this.target = scanResult[0]

	}
}


// accurate vector coordinates (angle, distance) of warpgates and planets - navigation
// angle (from velocity), heading, velocity, distance of asteroids - defense

// passive scan - heading, mass/distance - warpgates accurate position, list of objects of certain planets + list of objects of uncertain planets 
	// meteor - mass = 1, radius = 5
	// asteroid - mass = 5, radius = 15
	// warpgate - mass = -100, radius = 15
	// planet - mass = r^3*PI/10 (1060 ~ 13463), radius = 15 ~ 35
	// distance (540, 720) - farthest distance = 900
	// gravity = mass/distance (planet gravity > 1)

// active scan - angle(heading), distance, velocity, radius
				// close range - type, habitability
