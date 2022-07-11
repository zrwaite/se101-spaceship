import Vector2 from '../helpers/Vector2.js'
import { ShipStatus } from '../ship/shipStatus.js'
import { aimTurretType, fireTorpedoType, getTubeCooldownType } from '../ship/turretControls.js'
import SubsystemController from './subsystemController.js'

export default class DefenceController extends SubsystemController {
	defenceUpdate(shipStatusInfo: ShipStatus, aimTurret: aimTurretType, getTubeCooldown: getTubeCooldownType, fireTorpedo: fireTorpedoType) {}
}
