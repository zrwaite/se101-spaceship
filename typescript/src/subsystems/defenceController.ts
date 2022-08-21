import SubsystemController from './subsystemController.js'

export default class DefenceController extends SubsystemController {
	defenceUpdate(aimTurret: (angle: number) => void, getTubeCooldown: (i: number) => number | Error, fireTorpedo: (i: number) => Error | null) {}
}
