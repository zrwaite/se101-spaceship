//Based on AbstractSensorsController.cs
import AbstractSubsystemController from "./AbstractSubsystemController";
export default class AbstractSensorsController extends AbstractSubsystemController {
	SensorsUpdate(shipStatusInfo, activeSensors, passiveSensors, deltaTime);
}