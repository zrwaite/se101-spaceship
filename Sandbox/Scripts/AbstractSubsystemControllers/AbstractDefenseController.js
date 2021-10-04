//Based on AbstractDefenceController.cs
import AbstractSubsystemController from "./AbstractSubsystemController";
export default class AbstractDefenceController extends AbstractSubsystemController {
	DefenseUpdate(shipStatusInfo, turretControls, deltaTime);
}