import { ThrusterName } from '../ship/thrusterController.js'
import SubsystemController from './subsystemController.js'

export default class PropulsionController extends SubsystemController {
	propulsionUpdate(setThruster: (thruster: ThrusterName, power: number) => Error | null) {}
}
