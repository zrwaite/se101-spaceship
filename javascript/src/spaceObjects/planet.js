import Vector2 from '../helpers/Vector2.js';
import PlanetComposition from './planetComposition.js';
import Sprite from '../sprite.js';
export default class Planet extends Sprite {
    constructor(planetName, radius, ...args) {
        super(...args);
        this.ctx = 'planets';
        this.inOrbit = false;
        this.orbitCenter = null;
        this.orbitRadius = 0;
        this.orbitAngle = 0;
        /* Other attributes */
        this.process = null;
        if (radius < 20)
            throw new Error('Planet radius must be at least 15');
        if (radius > 50)
            throw new Error('Planet radius must be less than 35');
        this.imageName = getPlanetImageName(planetName);
        this.composition = getPlanetComposition(planetName);
        this.image = this.game.images[this.imageName];
        this.name = planetName;
        this.mass = (Math.PI * radius * radius * radius) / 10;
        this.size = new Vector2(radius * 2, radius * 2);
        this.radius = radius;
    }
    initialize(process) {
        this.process = process;
    }
    setOrbit(star) {
        star.addPlanet(this);
        this.inOrbit = true;
        this.orbitCenter = star.pos;
        this.orbitRadius = this.pos.distance(star.pos);
        this.orbitAngle = star.pos.angleToPoint(this.pos);
    }
    leaveOrbit() {
        this.inOrbit = false;
        this.speed = Vector2.right.rotateTo(this.orbitAngle + Math.PI / 2);
    }
    update() {
        var _a;
        if (this.inOrbit && this.orbitCenter) {
            this.orbitAngle += 1 / this.orbitRadius;
            const vecToPlanet = Vector2.right.rotateTo(this.orbitAngle).scaleTo(this.orbitRadius);
            this.pos = (_a = this.orbitCenter) === null || _a === void 0 ? void 0 : _a.add(vecToPlanet);
        }
        else if (!this.inOrbit && this.orbitCenter) {
            super.update();
        }
    }
}
// Ordered by survivability chance
const PlanetNames = [
    'Planet Joziac',
    'Exceptional',
    'Zig',
    'Big Bird',
    'Johnny Cash',
    'Melony',
    'Steve-O',
    'Rust',
    'Fortran',
    'Esquimalt',
    'Planet Two',
    'Watermelon',
    'Notch',
    'Planet Three (no Planet One)',
    'Pluto',
    'COBOL',
    'Abysmal',
    "You're Mother",
];
export const getPlanetImageName = (planetName) => {
    switch (planetName) {
        case 'Big Bird': return 'Neptune';
        case 'Rust': return 'Saturn';
        case 'Johnny Cash': return 'BlueStorm';
        case 'Notch': return 'Cheese';
        case "You're Mother": return 'DarkLava';
        case 'Zig': return 'DarkNeptune';
        case 'Pluto': return 'DeadGrey';
        case 'Melony': return 'PurplePlanet';
        case 'Planet Three (no Planet One)': return 'GreyLines';
        case 'Esquimalt': return 'IceCube';
        case 'Fortran': return 'IceWater';
        case 'Abysmal': return 'LightLava';
        case 'Watermelon': return 'Mars';
        case 'Steve-O': return 'PinkSaturn';
        case 'Exceptional': return 'PurpleStripes';
        case 'Planet Two': return 'SandyCheeks';
        case 'Planet Joziac': return 'EarthLookinAss';
        case 'COBOL': return 'LavaRing';
        default: throw Error('Unidentified planet name');
    }
};
export const getPlanetComposition = (planetName) => {
    switch (planetName) {
        case 'Planet Joziac': return new PlanetComposition(100, 100, 95, 80, 80, 20);
        case 'Exceptional': return new PlanetComposition(70, 60, 70, 60, 60, 15);
        case 'Zig': return new PlanetComposition(90, 90, 30, 60, 80, 10);
        case 'Big Bird': return new PlanetComposition(90, 100, 50, 35, 60, 30);
        case 'Johnny Cash': return new PlanetComposition(90, 70, 50, 50, 80, -10);
        case 'Melony': return new PlanetComposition(80, 80, 60, 30, 50, 10);
        case 'Steve-O': return new PlanetComposition(70, 70, 40, 30, 80, 20);
        case 'Rust': return new PlanetComposition(40, 70, 60, 65, 60, 40);
        case 'Fortran': return new PlanetComposition(100, 80, 40, 50, 50, -20);
        case 'Esquimalt': return new PlanetComposition(90, 70, 20, 50, 70, -90);
        case 'Planet Two': return new PlanetComposition(30, 70, 75, 60, 55, 50);
        case 'Watermelon': return new PlanetComposition(20, 60, 70, 50, 80, 40);
        case 'Notch': return new PlanetComposition(70, 30, 70, 40, 50, 50);
        case 'Planet Three (no Planet One)': return new PlanetComposition(40, 40, 30, 100, 80, -50);
        case 'Pluto': return new PlanetComposition(20, 30, 40, 90, 80, -70);
        case 'COBOL': return new PlanetComposition(20, 30, 30, 70, 60, 80);
        case 'Abysmal': return new PlanetComposition(20, 40, 30, 90, 30, 80);
        case "You're Mother": return new PlanetComposition(10, 30, 30, 80, 30, -70);
        default: throw Error('Unidentified planet name: ' + planetName);
    }
};
