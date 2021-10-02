//Based on AbstractPropulsionController.cs
import SubsystemController from "./AbstractSubsystemController";
export default class PropulsionController extends SubsystemController {
	PropulsionUpdate(shipStatusInfo, thrusters, deltaTime);
}