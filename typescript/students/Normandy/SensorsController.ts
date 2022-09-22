import { withinPiRange, Vector2, angleDiff } from '../helpers.js'
import SensorsController from '../../src/subsystems/sensorsController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import { EMSReading, PassiveReading } from '../types.js'
//import { isPrivateIdentifier } from '../../../node_modules/typescript/lib/typescript.js'
export default class YourSensorsController extends SensorsController {
    // To get other subsystem information, use the attributes below.
    // @ts-ignore
    defence: YourDefenceController; // @ts-ignore
    navigation: YourNavigationController; // @ts-ignore
    propulsion: YourPropulsionController;

	//Add additional attributes here
	target: PassiveReading | null = null
	passiveScans: (PassiveReading[] | Error)[] = [];
	activeScans: (EMSReading[] | Error)[] = [];
	passiveCooldown: number = 0;
	activeCooldown: number = 0;
    defenseTarget: EMSReading | null = null;
    
    coolDownTick = () => {
		this.activeCooldown--;
		this.passiveCooldown--;
    }

	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
		if (this.passiveCooldown > 0) {
			const scanResult = passiveScan()
			if(!(scanResult instanceof Error ))  {
				this.target = scanResult[0]	
				this.passiveScans.push(scanResult)
				console.log(this.passiveScans)
			}
			this.passiveCooldown = 100
		}

		if (this.activeCooldown > 0) {
            this.coolDownTick();
            return;
		}

        const activeScanResult = activeScan(0, Math.PI, 1000)
        if(!(activeScanResult instanceof Error) && activeScanResult.length > 0)  {	
            this.activeScans.push(activeScanResult)

            const badTargets = activeScanResult.filter((object) => object.closeRange && (object.closeRange.type === 'Asteroid' || object.closeRange.type === 'Meteor'));
            badTargets.sort((objectA, objectB) => objectA.distance - objectB.distance);

            this.defenseTarget = badTargets[0];
        }
        else {
            this.defenseTarget = null;
        }
        this.activeCooldown = 25

        this.coolDownTick();
	}	
}

