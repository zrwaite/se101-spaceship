import DefenceController from '../../src/subsystems/defenceController.js'
import { Vector2, withinPiRange, angleDiff } from '../helpers.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'
export default class YourDefenceController extends DefenceController {
	// To get other subsystem information, use the attributes below. 
	// @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	propulsion: YourPropulsionController
	//Add additional attributes here
	
	defenceUpdate(aimTurret: (angle: number) => void, getTubeCooldown: (i: number) => number | Error, fireTorpedo: (i: number) => Error | null) {

		//Student code goes here
		/*
		function usable: 
		aimTurret: (angle: number) => void
		Sets the turret to aim at the specified angle.
		Energy cost: (current angle - new angle) * 10.

		getTubeCooldown: (i: number) => number | Error
		Returns the cooldown time of the specified torpedo tube.
		Energy cost: 5.

		fireTorpedo: (i: number) => Error | null
		Tries to fire the torpedo at the specified tube.
		Returns null if successful.
		Energy cost: 8 if successful, 2 if failed.
		*/

		/*
		pseudocode: 
			get angle of target, coordinate of spaceship from sensor
			set up variables: energy cost = 0

			if target close enough and
			target type need to be shooted and 
			the energy used is less when shoot than turn around object

				aim turret
				shoot
				record energy cost

			send energy cost to propulsion control
		*/
		if(!this.sensors.target) return
		aimTurret(this.sensors.target.heading)
		fireTorpedo(0)
	}
}
