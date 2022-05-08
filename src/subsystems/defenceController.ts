import Vector2 from "../helpers/Vector2.js";
import { ShipStatus } from "../ship/shipStatus.js";
import SubsystemController from "./subsystemController.js";

export default abstract class DefenceController extends SubsystemController{
	abstract defenceUpdate(shipStatusInfo:ShipStatus, aimTurret:(angle:Vector2) => Response, getTubeCooldown:(tube:number) => Response, fireTorpedo:(tube:number) => Response):void
}
