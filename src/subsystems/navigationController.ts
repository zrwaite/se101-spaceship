import { ShipStatus } from "../ship/shipStatus.js";
import SubsystemController from "./subsystemController.js";

export default abstract class NavigationController extends SubsystemController{
	abstract navigationUpdate(shipStatusInfo:ShipStatus, warp:()=>Response, mapData: ()=>any):void;
}
