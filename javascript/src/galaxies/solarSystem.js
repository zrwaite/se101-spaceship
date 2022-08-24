import Vector2 from '../helpers/Vector2.js';
const SolarSystemNames = [
    'Tutorial',
    'Goose',
    'Waterloo',
    'StackOverflow',
    'Hargun',
    'Olivia',
    'Derek',
    'Ali',
    'ECE105',
    'Torvalds',
    'Zac',
    'Josiah',
    'Elon',
    'Gates',
    'Turing'
];
export default class SolarSystem {
    constructor(solarSystemName, galaxyName, game, objects) {
        var _a, _b, _c, _d;
        this.shipStartPosition = new Vector2(300, 300);
        this.game = game;
        this.galaxyName = galaxyName;
        this.name = solarSystemName;
        this.asteroids = (_a = objects.asteroids) !== null && _a !== void 0 ? _a : [];
        this.warpGates = (_b = objects.warpGates) !== null && _b !== void 0 ? _b : [];
        this.planets = (_c = objects.planets) !== null && _c !== void 0 ? _c : [];
        this.asteroidLaunchers = (_d = objects.asteroidLaunchers) !== null && _d !== void 0 ? _d : [];
        this.star = objects.star;
        this.blackhole = objects.blackhole;
        this.planetNames = this.planets.map((planet) => planet.name);
        this.warpGateNames = this.warpGates.map((warpGate) => warpGate.destinationSolarSystem);
    }
    activate() { }
}
