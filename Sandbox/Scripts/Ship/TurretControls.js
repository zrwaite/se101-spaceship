import Vector2 from "../Helpers/Vector2.js";

export default class TurretControls {
	constructor(parentTurret){
		this.parentTurret = parentTurret;
		this.aimTo = new Vector2(0,0);
	}
	getTubeCooldown(tubeIndex){
		if (tubeIndex<0||tubeIndex>=this.parentTurret.tubeCount) return false;
		return this.parentTurret.cooldowns(tubeIndex);
	}
	triggerTube(tubeIndex, fuseDuration){
		this.parentTurret.triggerTube(tubeIndex, fuseDuration);
	}
}