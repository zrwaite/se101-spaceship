import { ShipStatus } from "../ship/shipStatus.js";
import SubsystemController from "./subsystemController.js";

export default abstract class SensorsController extends SubsystemController{
	abstract sensorsUpdate(shipStatusInfo:ShipStatus, performActiveScan:()=>any, performPassiveScan:()=>any):void;
}
