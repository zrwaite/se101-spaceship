import { Vector2, withinPiRange, angleDiff } from '../helpers.js'
import { PassiveReading, ThrusterName } from '../types.js'
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
        const target = this.sensors.target;
        if (!target) return

        const angularVelocity = this.navigation.angularVelocity;

        // const targetVec = new Vector2(Math.cos(target.heading), Math.sin(target.heading));
        // const velVec = new Vector2(this.navigation.linearVelocityX, this.navigation.linearVelocityY);
        // const velVecProj = targetVec.scale(targetVec.dot(velVec.normalize()));
        // const headingVec = velVec.scale(-1).add(targetVec.scale(1));

        // let heading = 0;

        // if (velVec.magnitude() > 1.2 || angleDiff(velVec.angle(), target.heading) > 0.05) {
        //     const headingAngle = headingVec.angle();
        //     heading = angleDiff(this.navigation.angle, headingAngle);       
        // }
        // else {
        //     heading = angleDiff(this.navigation.angle, target.heading);     
        // }
        const heading = angleDiff(this.navigation.angle, target.heading);

        const direction = angularVelocity == 0 ? "away" : heading / angularVelocity < 0 ? "towards" : "away";

        let force = 0;

        if (angularVelocity > 0.03) {
            setThruster('counterClockwise', 100)
            setThruster('clockwise', 0)
        }
        else if (angularVelocity < -0.03) {
            setThruster('clockwise', 100)
            setThruster('counterClockwise', 0)
        }
        else if (direction == "away" || direction == "towards" && Math.abs(heading) > 15 * angularVelocity) {
            // implement algorithm to go back
            force = Math.min(Math.abs(500 * heading * Math.sqrt(Math.abs(heading))), 100);

            if (heading < 0) {
                setThruster('clockwise', force)
                setThruster('counterClockwise', 0)
            }
            else {
                setThruster('counterClockwise', force)
                setThruster('clockwise', 0)
            }
        }
        else {
            // implement algorithm to slow down
            force = Math.min(angularVelocity * 15000, 100);

            if (heading < 0) {
                setThruster('counterClockwise', force)
                setThruster('clockwise', 0)
            }
            else {
                setThruster('clockwise', force)
                setThruster('counterClockwise', 0)
            }
        }

        setThruster('main', Math.abs(heading) < 0.2 ? 100 : 0);
        setThruster("bow", 0);

        const objects = this.sensors.activeScanData;
        if (objects) {
            for (let i = 0; i < (objects.length); i++) {
                const object = objects![i];

                const speed = Math.sqrt(this.navigation.linearVelocityX * this.navigation.linearVelocityX + this.navigation.linearVelocityY + this.navigation.linearVelocityY)

                if (object.distance < 500 && heading < 0.2 && speed > object.distance / 200) {
                    setThruster('bow', Math.abs(heading) < 0.2 ? Math.min(object.distance, 100) : 0);
                    setThruster("main", 0);
                }
                
            }

        }
    }
}