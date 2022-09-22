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
  type: 'Planet' | 'Meteor' | 'Asteroid' | 'WarpGate' | 'Other' 
}
export default class YourSensorsController extends SensorsController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	propulsion: YourPropulsionController //@ts-ignore
	target: PassiveReading | null = null 

	//Add additional attributes here
    passiveScannedObjects: SpaceObject[] = [];
	activeScannedObjects: SpaceObject[] = [];

	activeHeading: number = 0;
	activeArc: number = Math.PI/4;
	activeRange: number = 150;


	public get warpgatesOrPlanets() {
		return [...this.passiveScannedObjects, ...this.activeScannedObjects].filter((so) => ['Other', "WarpGate"].includes(so.type));
	}

	public get asteroids() {
		return this.activeScannedObjects.filter((so) => "Asteroid" == so.type);
	}

	public setActiveParam(heading: number, arc: number, range: number){
		this.activeHeading = heading
		this.activeArc = arc
		this.activeRange = range
	}

	public get activeResults() {
		return this.activeScannedObjects;
	}


	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
		const passiveScanResult = passiveScan()

		if ((passiveScanResult instanceof Error)) return;
		
		this.passiveScannedObjects = passiveScanResult.map((reading) => {

			let type: 'Planet' | 'Meteor' | 'Asteroid' | 'WarpGate' | 'Other' = 'Other'
			let certainty = 0.5
			let distance: number | undefined = undefined;
			let mass: number | undefined = undefined;

			if (reading.gravity < 0){
				type = 'WarpGate'
				certainty = 1
				mass = -100
				distance = reading.gravity / mass
			} else if (reading.gravity < 1){
				type = 'Asteroid'
				mass = 5
				distance = reading.gravity / mass
			} else{
				type = 'Planet'
				mass = 37.5
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
		

		const activeScanResult = activeScan(this.activeHeading, this.activeArc, this.activeRange)

		if ((activeScanResult instanceof Error)) return;

		this.activeScannedObjects = activeScanResult.map((reading) => {

			const distance = reading.distance

			let certainty = 0.5
			let type: 'Planet' | 'Meteor' | 'Asteroid' | 'WarpGate' | 'Other' = 'Other'
			
			if (distance < 100) {
				certainty = 1
				type = reading.closeRange?.type ?? 'Other'
			}

			return{
				angle: reading.angle,
				distance,
				velocity: reading.velocity,
				radius: reading.radius,
				type,
				certainty,
			}
		})
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
