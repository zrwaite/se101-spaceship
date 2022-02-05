export default class PlanetComposition {
	/* Attributes */
	water;
	air;
	land;
	metal;
	danger;
	temperature;
	constructor(water, air, land, metal, danger, temperature) {
		this.water = water;
		this.air = air;
		this.land = land;
		this.metal = metal;
		this.danger = danger;
		this.temperature = temperature;
		this.maintainRange();
	}
	maintainRange() {
		if (this.water>100) this.water = 100;
		else if (this.water<0) this.water = 0;
		if (this.air>100) this.air = 100;
		else if (this.air<0) this.air = 0;
		if (this.land>100) this.land = 100;
		else if (this.land<0) this.land = 0;
		if (this.metal>100) this.metal = 1000;
		else if (this.metal<0) this.metal = 0
		if (this.danger>100) this.danger = 100;
		else if (this.danger<0) this.danger = 0;
		if (this.temperature>100) this.temperature = 100;
		else if (this.temperature<-100) this.temperature = -100;
	}
	get survivabilityChance() {
		let survivabilityChance = 0;
		survivabilityChance+=8*this.getDistribution1(this.water);
		survivabilityChance+=8*this.getDistribution1(this.air);
		survivabilityChance+=5*this.getDistribution1(this.land);
		survivabilityChance+=4*this.getDistribution1(this.metal);
		survivabilityChance+=6*this.getDistribution1(100-this.danger);
		survivabilityChance+=6*this.getDistribution2(this.temperature);
		if (survivabilityChance>100) survivabilityChance = 100;
		return survivabilityChance;
	}
	getDistribution1(num) {
		return Math.atan(0.1*(num-50))+1.5;
	}
	getDistribution2(num) {
		return 20/(((0.1*(num-15))**2)+5);
	}

}