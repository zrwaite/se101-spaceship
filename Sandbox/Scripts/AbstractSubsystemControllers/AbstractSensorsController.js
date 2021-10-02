//Based on AbstractSensorsController.cs
import SubsystemController from "./AbstractSubsystemController";
export default class SensorsController extends SubsystemController {
	SensorsUpdate(shipStatusInfo, activeSensors, passiveSensors, deltaTime);
}