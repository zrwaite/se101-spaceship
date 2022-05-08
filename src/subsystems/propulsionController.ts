import { ShipStatus } from "../ship/shipStatus.js";
import SubsystemController from "./subsystemController.js";

export default abstract class PropulsionController extends SubsystemController{
	abstract propulsionUpdate(shipStatusInfo:ShipStatus, setThrusters:()=>Response):void;
}
