import { activeScanType } from '../ship/activeSensors.js'
import { passiveScanType } from '../ship/passiveSensors.js'
import { ShipStatus } from '../ship/shipStatus.js'
import SubsystemController from './subsystemController.js'

export default class SensorsController extends SubsystemController {
	sensorsUpdate(activeScan: activeScanType, passiveScan: passiveScanType) {}
}
