import { BuildCompiles } from './compiles.js';
import { BuildCracked } from './cracked.js';
import { BuildJoziac } from './joziac.js';
import { BuildNoob } from './noob.js';
export default class Galaxy {
    constructor(galaxyName, game, solarSystems) {
        /* Default Attributes */
        this.solarSystems = [];
        this.solarSystemNames = [];
        this.name = galaxyName;
        this.game = game;
        this.solarSystems = solarSystems;
        // Create solar systems with associated galaxy
        for (const solarSystem of this.solarSystems) {
            this.solarSystemNames.push(solarSystem.name);
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
export const BuildGalaxy = (galaxyName, game) => {
    switch (galaxyName) {
        case 'Noob': return BuildNoob(game);
        case 'Compiles': return BuildCompiles(game);
        case 'Cracked': return BuildCracked(game);
        case 'Joziac': return BuildJoziac(game);
    }
};
