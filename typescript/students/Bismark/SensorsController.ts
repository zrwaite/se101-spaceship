import SensorsController from '../../src/subsystems/sensorsController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import { ShipStatus, activeScanType, passiveScanType, EMSReading, PassiveSensorReading } from '../types.js'
import { Vector2, withinPiRange } from '../helpers.js'

const sortClosest = (a : EMSReading,b : EMSReading) => {
	return a.distance - b.distance
}

const sortGravity = (a : PassiveSensorReading,b : PassiveSensorReading) => {
	if (a.gravity > 30) {
		if (b.gravity > 30) return a.gravity - b.gravity
		return -1
	} else if (a.gravity < 0) {
		if (b.gravity < 0) return b.gravity - a.gravity
		return 1
	} else {
		if (b.gravity > 30 || b.gravity < 0) return 1
		return a.gravity - b.gravity
	}
}

export default class YourSensorsController extends SensorsController {
	// To get other subsystem information, use the attributes below.
	defence?: YourDefenceController
	navigation?: YourNavigationController
	propulsion?: YourPropulsionController
	// Define additional attributes here
	timer = 0
	idealPosition: Vector2 | null = null
	idealHeading: number = 0
	useHeading: boolean = false
	asteroidPositions: Vector2[] = []
	sensorsUpdate(shipStatusInfo: ShipStatus, activeScan: activeScanType, passiveScan: passiveScanType) {
		//Student code goes here
		if (this.timer % 50 === 0) {
			const warpGates:EMSReading[] = []
			const asteroids:EMSReading[] = []
			const planets: EMSReading[] = []
			const heading = shipStatusInfo.angle
			const activeScanResult = activeScan(withinPiRange(heading - Math.PI/2), Math.PI, 500)
			activeScanResult.response.forEach((obj) => {
				if (obj.radius === 15) warpGates.push(obj)
				else if (obj.radius < 15) asteroids.push(obj)
				else if (obj.radius > 20) planets.push(obj)
			})
			asteroids.forEach((asteroid) => {
				const asteroidVector = Vector2.right.rotateTo(asteroid.angle).scaleTo(asteroid.distance)
				this.asteroidPositions.push(shipStatusInfo.position.add(asteroidVector))
			})

			if (warpGates.length === 0 && planets.length ===0) {
				const passiveScanResult = passiveScan()
				passiveScanResult.response.sort(sortGravity)
				this.idealPosition = null
				this.useHeading = true
				this.idealHeading = passiveScanResult.response[0].heading
			} else {
				let target: EMSReading
				if (planets.length !== 0) {
					planets.sort(sortClosest)
					target = planets[0]
				} else {
					warpGates.sort(sortClosest)
					target = warpGates[0]
				}
				const headingVector = Vector2.right.rotateTo(target.angle).scaleTo(target.distance)
				this.idealPosition = shipStatusInfo.position.add(headingVector)
				this.useHeading = false
			}
		}
		this.timer++
	}
}
