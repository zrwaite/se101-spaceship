import Vector2 from "../Helpers/Vector2.js";
import Torpedo from "../../../src/ship/torpedo.js";

export default class Turret {
	constructor(parentShip, turretControls){
		this.tubeCount = 4;
		this.launchSpeed = 0.2;
		this.torpedoScene;
		this.turretControls;
		this.parentShip;
		this.cooldownDuration = 3;
		this.cooldowns = new Array(this.tubeCount);
		this.torpedoSpeed = this.launchSpeed;
		this.parentShip = parentShip;
		this.game = this.parentShip.game;
		this.turretControls = turretControls;
		this.direction = new Vector2(0, 1);
	}

	_Ready(){
		for (let i = 0; i<this.tubeCount; i++){
			this.cooldowns[i]=0;
		}
	}
	_Process(delta){
		this.direction.set(0,1);
		for (let i = 0; i<this.tubeCount; i++){
			this.cooldowns[i]=Math.max(0, this.cooldowns[i]-delta);
		}
	}
	fireMissile(fuseDuration){		
		let torpedoVelocity = this.direction.scale(this.launchSpeed)		// calculate velocity of fired missile
		let newTorpedo = new Torpedo(fuseDuration, this.parentShip, torpedoVelocity, this.parentShip.pos, this.game)
		this.game.spawnDeletableObject(newTorpedo);
		this.parentShip.TorpedoesFired++;
	}
	triggerTube(tubeIndex, fuseDuration){
		if (tubeIndex<0||tubeIndex>=this.tubeCount) return false;
		if (cooldowns[tubeIndex]<=0) {
			this.fireMissle(fuseDuration);
			this.cooldowns[tubeIndex] = this.cooldownDuration;
		}
	}
}