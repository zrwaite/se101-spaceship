import RenderedObject from '../renderedObject.js';
import Vector2 from '../helpers/Vector2.js';
export default class Planet extends RenderedObject {
    constructor(planetName, radius, composition, ...args) {
        super(...args);
        this.ctx = 'planets';
        /* Other attributes */
        this.process = null;
        if (radius < 15)
            throw new Error('Planet radius must be at least 15');
        this.image = this.game.images[planetName] || this.game.images['planet1'];
        this.name = planetName;
        this.composition = composition;
        this.mass = (Math.PI * radius * radius * radius) / 10;
        this.size = new Vector2(radius * 3, radius * 3);
        this.radius = radius;
    }
    initialize(process) {
        this.process = process;
    }
}
const PlanetNames = [
    'Big Bird',
    'Johnny Cash',
    'Steve-O',
    'Notch',
    "You're Mother",
    'Dad Sugar',
    'Watermelon',
    'Melony',
    'Esquimalt',
    'Exceptional',
    'Abysmal',
    'Pluto',
    'Fortran',
    'Rust',
    'Zig',
    'COBOL',
    'Planet Joziac',
    'Planet Two',
    'Planet Three (no Planet One)',
];
export const getPlanetImageName = (planetName) => {
    switch (planetName) {
        case 'Rust': return 'Saturn';
        case 'Johnny Cash': return 'BlueStorm';
        case 'Notch': return 'Cheese';
        case "You're Mother": return 'DarkLava';
        case 'Zig': return 'DarkNeptune';
        case 'Pluto': return 'DeadGrey';
        case 'Exceptional': return 'EarthLookinAss';
        case 'Esquimalt': return 'GreyLines';
        case 'Abysmal': return 'IceCube';
        case 'Fortran': return 'IceWater';
        case 'Planet Three (no Planet One)': return 'LavaRing';
        case 'COBOL': return 'LightLava';
        case 'Watermelon': return 'Mars';
        case 'Big Bird': return 'Neptune';
        case 'Steve-O': return 'PinkSaturn';
        case 'Planet Joziac': return 'PurplePlanet';
        case 'Melony': return 'PurpleStripes';
        case 'Planet Two': return 'SandyCheeks';
        default: throw Error('Unidentified planet name');
    }
};
