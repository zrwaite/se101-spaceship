import APIResponse from '../helpers/response.js'
import Vector2 from '../helpers/Vector2.js'
import { ShipStatus } from '../ship/shipStatus.js'
import SubsystemController from './subsystemController.js'

export default class SensorsController extends SubsystemController {
	sensorsUpdate(shipStatusInfo: ShipStatus, activeScan: (heading: number, arc: number, range: number) => APIResponse, passiveScan: () => APIResponse) {}
}
