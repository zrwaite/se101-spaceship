import { ShipStatus } from '../ship/shipStatus.js'
import { setThrustersType } from '../ship/thrusterController.js'
import SubsystemController from './subsystemController.js'

export default class PropulsionController extends SubsystemController {
	propulsionUpdate(shipStatusInfo: ShipStatus, setThrusters: setThrustersType) {}
}
