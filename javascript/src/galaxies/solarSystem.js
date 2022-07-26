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
        this.shipStartPosition = new Vector2(300, 300);
        this.game = game;
        this.galaxyName = galaxyName;
        this.name = solarSystemName;
        this.asteroids = objects.asteroids || [];
        this.warpGates = objects.warpGates || [];
        this.planets = objects.planets || [];
        this.asteroidLaunchers = objects.asteroidLaunchers || [];
    }
    getMapData() {
        return {
            galaxy: this.galaxyName,
            solarSystem: this.name,
            planetNames: this.planets.map((planet) => planet.name),
        };
    }
}
