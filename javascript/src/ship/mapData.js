export const getMapData = (ship) => {
    ship.energyUsed += 10;
    const galaxy = ship.game.galaxy;
    if (galaxy === null)
        throw Error("No galaxy loaded");
    return {
        solarSystemName: ship.solarSystem.name,
        galaxy: {
            name: galaxy.name,
            solarSystems: galaxy.solarSystems.map((solarSystem) => ({
                name: solarSystem.name,
                warpGates: solarSystem.warpGates.map((warpGate) => warpGate.destinationSolarSystem),
                planets: solarSystem.planets.map((planet) => planet.name)
            }))
        }
    };
};
