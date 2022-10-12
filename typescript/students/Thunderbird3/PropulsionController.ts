import { angleDiff, Vector2, withinPiRange } from '../helpers.js'
import { ThrusterName } from '../types.js'
import PropulsionController from '../../src/subsystems/propulsionController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourSensorsController from './SensorsController.js'
import { EMSReading } from '../types.js'
export default class YourPropulsionController extends PropulsionController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	navigation: YourNavigationController
    didsetThruster: boolean = false
	//Add additional attributes here
	propulsionUpdate(setThruster: (thruster: ThrusterName, power: number) => Error | null) {
        if(!this.sensors.target) return

        const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading)
        const force = Math.min(Math.abs(1000 * headingDiff), 100)
        const absHeadingDiff = Math.abs(headingDiff);

        if (Math.abs(headingDiff) < 0.0001) {
            setThruster('clockwise', 0)
            setThruster('counterClockwise', 0);
        }
        else if (Math.abs(headingDiff) < 0.2 || Math.abs(this.navigation.angularVelocity) > 0.02) {
            if (this.navigation.angularVelocity < 0) {
                setThruster('clockwise', this.calculateAccelAngle(this.navigation.angularVelocity, this.navigation.angle, this.sensors.target.heading))
                setThruster('counterClockwise', 0)
            }
            else {
                setThruster('counterClockwise', this.calculateAccelAngle(this.navigation.angularVelocity, this.navigation.angle, this.sensors.target.heading))
                setThruster('clockwise', 0)
            }
        }
        else if(headingDiff < 0) {
            setThruster('counterClockwise', 0);
            if(absHeadingDiff > 0.5) {
                setThruster('clockwise', 30);
            }
            if(absHeadingDiff <= 0.5 && absHeadingDiff > 0.25) {
                setThruster('clockwise', 10);
            }
            if(absHeadingDiff <= 0.25) {
                setThruster('clockwise', 5);
                setThruster('counterClockwise', 2)
            }
            if(absHeadingDiff <= 0.10) {
                setThruster('clockwise', 0);
                setThruster('counterClockwise', -5);
            }
        }
        else if(headingDiff > 0) {
            setThruster('clockwise', 0);
            if(absHeadingDiff > 0.5) {
                setThruster('counterClockwise', 30);
            }
            if(absHeadingDiff <= 0.5 && absHeadingDiff > 0.25) {
                setThruster('counterClockwise', 10);
            }
            if(absHeadingDiff <= 0.25) {
                setThruster('counterClockwise', 5);
                setThruster('clockwise', 2)
            }
            if(absHeadingDiff <= 0.10) {
                setThruster('counterClockwise', 0);
                setThruster('clockwise', -5);
            }
        }

        var EMS:(EMSReading[] | Error) = this.sensors.activeScans[0]
        var dist=0
        const heading = this.sensors.target.heading;
        if(!(EMS instanceof Error ) && (EMS != null))  {
            EMS.forEach( (element) => {
                if(Math.abs(element.angle - heading) <= 0.01) {
                    dist = element.distance;
                }
            });
        }
        var accel = this.calculateVelocity(Math.sqrt(this.navigation.linearVelocityX*this.navigation.linearVelocityX  + this.navigation.linearVelocityY*this.navigation.linearVelocityY), dist)
        var speed = Math.sqrt(this.navigation.linearVelocityX*this.navigation.linearVelocityX  + this.navigation.linearVelocityY*this.navigation.linearVelocityY)
        console.log(speed)
        if(Math.abs(headingDiff) < 0.25 && dist < 400 && speed > 0.01) {
            setThruster('main', 0)
            setThruster('bow', Math.min(100, Math.abs(accel)))
            console.log(dist)
        }
        else if(Math.abs(headingDiff) < 0.25) {
            setThruster('bow', 0);
            setThruster('main', 100);
            console.log(dist)
        }


        //console.log(headingDiff);
    }
    calculateVelocity (currentVelocity: number, distance: number) {
        var val = 99999*currentVelocity*currentVelocity/(2*distance);
        console.log(val);
        return val;
    }

    calculateAccelAngle(currentAngVelo: number, currentAngle: number, targetAngle: number) {
        //console.log(currentAngVelo + " " + currentAngle + " " + targetAngle)
        var val = 99999*Math.abs((currentAngVelo*currentAngVelo)/(2*angleDiff(currentAngle,targetAngle)))
        // console.log(val + " " + currentAngVelo + " " + angleDiff(currentAngle,targetAngle))
		return val
	}
}


        // var kD=0.5, kP=0.7, kI=0.4, E=0, prevE=0, I=0, D=0, P, Pwr=0, Dst=headingDiff;

        // if (headingDiff < 0){
        //     do {
        //         E = Dst - angleDiff(this.navigation.angle, this.sensors.target.heading)
        //         I += E;
        //         if(E == 0 || Math.abs(E) > Math.abs(Dst)) {
        //             I = 0;
        //         }
        //         D = E - prevE;
        //         prevE = E;
        //         Pwr = E*kP + I*kI + D*kD;
        //         setThruster('clockwise', Pwr);
        //         setThruster('counterClockwise', 0);
        //     } while(Math.abs(E)>=0.05);
        // } else {
        //     do {
        //         E = Dst - angleDiff(this.navigation.angle, this.sensors.target.heading)
        //         I += E;
        //         if(E == 0 || Math.abs(E) > Math.abs(Dst)) {
        //             I = 0;
        //         }
        //         D = E - prevE;
        //         prevE = E;
        //         Pwr = E*kP + I*kI + D*kD;
        //         setThruster('clockwise', 0);
        //         setThruster('counterClockwise', Pwr);
        //     } while(Math.abs(E)>=0.05);
        // }
        // // setThruster('main', Math.abs(headingDiff) < 0.2 ? 30 : 0)