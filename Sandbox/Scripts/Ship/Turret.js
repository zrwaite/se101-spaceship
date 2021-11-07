import Vector2 from "../Helpers/Vector2";
// IMPORT TORPEDO

class Turret {
	constructor(parentShip, turretControls){
		this.tubeCount = 4;
		this.launchSpeed = 100;
		this.torpedoScene;
		this.turretControls;
		this.parentShip;
		this.cooldownDuration = 3;
		this.cooldowns = new Array(this.tubeCount);
		this.torpedoSpeed = this.launchSpeed;
		this.parentShip = parentShip;
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
	fireMissle(fuseDuration){		//Position			//Direction			/Speed			//FuseDuration? (Whatever that means)
		let newTorpedo = new Torpedo(this.parentShip.pos, this.direction, this.launchSpeed, fuseDuration)
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