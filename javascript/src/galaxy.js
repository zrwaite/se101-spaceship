import SolarSystem from './solarSystem.js';
export default class Galaxy {
    constructor(galaxyName, game) {
        /* Default Attributes */
        this.solarSystems = [];
        this.solarSystemNames = [];
        this.name = galaxyName;
        this.game = game;
        switch (galaxyName) {
            case 'Noob':
                this.solarSystemNames.push('Tutorial');
                break;
            case 'Compiles':
                this.solarSystemNames.push('Goose', 'Waterloo', 'StackOverflow');
                break;
            case 'Cracked':
                this.solarSystemNames.push("Hargun", 'Olivia', 'Ali', 'Derek');
                break;
            case 'Joziac':
                this.solarSystemNames.push('ECE105', 'Torvalds', 'Gates', 'Elon', 'Josiah', 'Zac', 'Turing');
                break;
        }
        // Create solar systems with associated galaxy
        for (const name of this.solarSystemNames) {
            this.solarSystems.push(new SolarSystem(name, this.name, this.game));
        }
        // Set starting solar system to the first system in the list
        this.startingSolarSystem = this.solarSystems[0];
        this.startingSolarSystemName = this.solarSystemNames[0];
    }
    getSolarSystem(solarSystemName) {
        let returnSolarSystem = false;
        this.solarSystems.forEach((solarSystem) => {
            if (solarSystem.name === solarSystemName) {
                returnSolarSystem = solarSystem;
            }
        });
        return returnSolarSystem;
    }
}
