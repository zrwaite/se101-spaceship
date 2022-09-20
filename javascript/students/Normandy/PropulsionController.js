import { angleDiff } from '../helpers.js';
import PropulsionController from '../../src/subsystems/propulsionController.js';
export default class YourPropulsionController extends PropulsionController {
    //Add additional attributes here
    propulsionUpdate(setThruster) {
        if (!this.sensors.target)
            return;
        // angleDiff (current, desired) --> returns difference between current heading and desired heading
        const headingDiff = angleDiff(this.navigation.angle, this.sensors.target.heading);
        // force (heading difff) --> returns the heading diff or 100 if the difference in heading is higher
        /*
            update function (set on a straight path)
        */
        const force = Math.min(Math.abs(1000 * headingDiff), 500);
        // while(Math.abs(headingDiff) >= 0.005) {
        if (Math.abs(headingDiff) < 0.005) {
            setThruster('clockwise', 0);
            setThruster('counterClockwise', 0);
        }
        if (headingDiff < 0) {
            setThruster('clockwise', 1 * headingDiff);
            setThruster('counterClockwise', 0);
        }
        else if (headingDiff > 0) {
            setThruster('clockwise', 0);
            setThruster('counterClockwise', 1 * headingDiff);
        }
        if (Math.abs(headingDiff) < 0.05) {
            setThruster('main', 100);
        }
        else {
            setThruster('main', 0);
        }
        console.log(headingDiff);
        // }
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
