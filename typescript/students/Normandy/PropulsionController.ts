import { angleDiff, Vector2, withinPiRange } from '../helpers.js'
import { ThrusterName } from '../types.js'
import PropulsionController from '../../src/subsystems/propulsionController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourSensorsController from './SensorsController.js'
export default class YourPropulsionController extends PropulsionController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	navigation: YourNavigationController

	//Add additional attributes here
	propulsionUpdate(setThruster: (thruster: ThrusterName, power: number) => Error | null) {
        // if no value for target is identified, do nothing
        if(!this.sensors.target) return

        // angleDiff (current, desired) --> returns difference between current heading and desired heading
        const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading)

        // force (heading difff) --> returns the heading diff or 100 if the difference in heading is higher

        /*
            update function (set on a straight path)
        */
        const force = Math.min(Math.abs(1000 * headingDiff), 500)


        // turn function --> clockwise if headingDiff < 0 && counter-clockwise if headingDiff > 0
        setThruster('main', force);
        // if (headingDiff < 0){
        //     setThruster('clockwise', force)
        //     setThruster('counterClockwise', 0)
        // } else {
        //     setThruster('counterClockwise', force)
        //     setThruster('clockwise', 0)
        // }
        // setThruster('main', Math.abs(headingDiff) < 0.2 ? 30 : 0)
    }
}
