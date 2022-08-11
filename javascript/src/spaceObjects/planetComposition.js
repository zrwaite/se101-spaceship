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
        survivabilityChance += 8 * this.getDistribution100(this.water);
        survivabilityChance += 8 * this.getDistribution100(this.air);
        survivabilityChance += 6 * this.getDistribution100(this.land);
        survivabilityChance += 3 * this.getDistribution100(this.metal);
        survivabilityChance += 5 * this.getDistribution100(this.safety);
        survivabilityChance += 4 * this.getDistribution20(this.temperature);
        if (survivabilityChance > 100)
            survivabilityChance = 100;
        return survivabilityChance;
    }
    getDistribution100(num) {
        // s curve around 50
        // 0: 0.127
        // 50: 1.5
        // 100: 2.87
        return Math.atan(0.1 * (num - 50)) + 1.5;
    }
    getDistribution20(num) {
        // Bell curve around 20
        // -100: 0.067
        // 0: 1.1
        // 20: 2
        // 100: 0.14
        return 10 / ((0.1 * (num - 20)) ** 2 + 5);
    }
}
