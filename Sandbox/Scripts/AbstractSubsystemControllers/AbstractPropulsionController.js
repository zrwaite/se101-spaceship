//Based on AbstractPropulsionController.cs
import AbstractSubsystemController from "./AbstractSubsystemController";
export default class AbstractPropulsionController extends AbstractSubsystemController {
	PropulsionUpdate(shipStatusInfo, thrusters, deltaTime);
}