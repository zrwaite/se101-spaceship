export default class PlanetComposition {
    constructor(water, air, land, metal, safety, temperature) {
        this.water = water;
        this.air = air;
        this.land = land;
        this.metal = metal;
        this.safety = safety;
        this.temperature = temperature;
        this.maintainRange();
    }
    maintainRange() {
        ;
        ['water', 'air', 'land', 'metal', 'safety'].forEach((key) => {
            if (this[key] < 0)
                throw Error(`Planet composition ${key} value must be greater than 0: ${this[key]}`);
            if (this[key] > 100)
                throw Error(`Planet composition ${key} value must be less than 100: ${this[key]}`);
        });
        if (this.temperature > 100)
            throw Error('Planet composition temperature must be less than 100: ' + this.temperature);
        else if (this.temperature < -100)
            throw Error('Planet composition temperature must be greater than -100: ' + this.temperature);
    }
    get survivabilityChance() {
        let survivabilityChance = 0;
        survivabilityChance += 8 * this.getDistribution1(this.water);
        survivabilityChance += 8 * this.getDistribution1(this.air);
        survivabilityChance += 5 * this.getDistribution1(this.land);
        survivabilityChance += 4 * this.getDistribution1(this.metal);
        survivabilityChance += 6 * this.getDistribution1(this.safety);
        survivabilityChance += 6 * this.getDistribution2(this.temperature);
        if (survivabilityChance > 100)
            survivabilityChance = 100;
        return survivabilityChance;
    }
    getDistribution1(num) {
        return Math.atan(0.1 * (num - 50)) + 1.5;
    }
    getDistribution2(num) {
        return 20 / ((0.1 * (num - 15)) ** 2 + 5);
    }
}
