import APIResponse from "../helpers/response.js";
import { ShipStatus } from "../ship/shipStatus.js";
import { ThrusterName } from "../ship/thrusterController.js";
import SubsystemController from "./subsystemController.js";

export default class PropulsionController extends SubsystemController{
	propulsionUpdate(shipStatusInfo:ShipStatus, setThrusters:(thrusterName: ThrusterName, power:number)=>APIResponse){}
}
