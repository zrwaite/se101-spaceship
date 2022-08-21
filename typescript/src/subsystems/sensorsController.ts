import { EMSReading } from '../ship/EMSReading.js'
import { PassiveReading } from '../ship/passiveReading.js'
import SubsystemController from './subsystemController.js'

export default class SensorsController extends SubsystemController {
	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {}
}


