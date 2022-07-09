import APIResponse from '../helpers/response.js'
import Vector2 from '../helpers/Vector2.js'
import { ShipStatus } from '../ship/shipStatus.js'
import SubsystemController from './subsystemController.js'

export default class DefenceController extends SubsystemController {
	defenceUpdate(shipStatusInfo: ShipStatus, aimTurret: (angle: number) => APIResponse, getTubeCooldown: (tube: number) => APIResponse, fireTorpedo: (tube: number) => APIResponse) {}
}
