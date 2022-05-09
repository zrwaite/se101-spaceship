import ColonyShip from "./colonyShip.js";
import BebopDefenceController from "../../students/Bebop/DefenseController.js";
import BebopNavigationController from "../../students/Bebop/NavigationController.js";
import BebopPropulsionController from "../../students/Bebop/PropulsionController.js";
import BebopSensorsController from "../../students/Bebop/SensorsController.js";
import BismarkDefenceController from "../../students/Bismark/DefenseController.js";
import BismarkNavigationController from "../../students/Bismark/NavigationController.js";
import BismarkPropulsionController from "../../students/Bismark/PropulsionController.js";
import BismarkSensorsController from "../../students/Bismark/SensorsController.js";
import EnterpriseDefenceController from "../../students/Enterprise/DefenseController.js";
import EnterpriseNavigationController from "../../students/Enterprise/NavigationController.js";
import EnterprisePropulsionController from "../../students/Enterprise/PropulsionController.js";
import EnterpriseSensorsController from "../../students/Enterprise/SensorsController.js";
import EventHorizonDefenceController from "../../students/EventHorizon/DefenseController.js";
import EventHorizonNavigationController from "../../students/EventHorizon/NavigationController.js";
import EventHorizonPropulsionController from "../../students/EventHorizon/PropulsionController.js";
import EventHorizonSensorsController from "../../students/EventHorizon/SensorsController.js";
import FlyingDutchmanDefenceController from "../../students/FlyingDutchman/DefenseController.js";
import FlyingDutchmanNavigationController from "../../students/FlyingDutchman/NavigationController.js";
import FlyingDutchmanPropulsionController from "../../students/FlyingDutchman/PropulsionController.js";
import FlyingDutchmanSensorsController from "../../students/FlyingDutchman/SensorsController.js";
import GalacticaDefenceController from "../../students/Galactica/DefenseController.js";
import GalacticaNavigationController from "../../students/Galactica/NavigationController.js";
import GalacticaPropulsionController from "../../students/Galactica/PropulsionController.js";
import GalacticaSensorsController from "../../students/Galactica/SensorsController.js";
import MilanoDefenceController from "../../students/Milano/DefenseController.js";
import MilanoNavigationController from "../../students/Milano/NavigationController.js";
import MilanoPropulsionController from "../../students/Milano/PropulsionController.js";
import MilanoSensorsController from "../../students/Milano/SensorsController.js";
import NormandyDefenceController from "../../students/Normandy/DefenseController.js";
import NormandyNavigationController from "../../students/Normandy/NavigationController.js";
import NormandyPropulsionController from "../../students/Normandy/PropulsionController.js";
import NormandySensorsController from "../../students/Normandy/SensorsController.js";
import NostromoDefenceController from "../../students/Nostromo/DefenseController.js";
import NostromoNavigationController from "../../students/Nostromo/NavigationController.js";
import NostromoPropulsionController from "../../students/Nostromo/PropulsionController.js";
import NostromoSensorsController from "../../students/Nostromo/SensorsController.js";
import PillarOfAutumnDefenceController from "../../students/PillarOfAutumn/DefenseController.js";
import PillarOfAutumnNavigationController from "../../students/PillarOfAutumn/NavigationController.js";
import PillarOfAutumnPropulsionController from "../../students/PillarOfAutumn/PropulsionController.js";
import PillarOfAutumnSensorsController from "../../students/PillarOfAutumn/SensorsController.js";
import PlanetExpressDefenceController from "../../students/PlanetExpress/DefenseController.js";
import PlanetExpressNavigationController from "../../students/PlanetExpress/NavigationController.js";
import PlanetExpressPropulsionController from "../../students/PlanetExpress/PropulsionController.js";
import PlanetExpressSensorsController from "../../students/PlanetExpress/SensorsController.js";
import RamaDefenceController from "../../students/Rama/DefenseController.js";
import RamaNavigationController from "../../students/Rama/NavigationController.js";
import RamaPropulsionController from "../../students/Rama/PropulsionController.js";
import RamaSensorsController from "../../students/Rama/SensorsController.js";
import RedDwarfDefenceController from "../../students/RedDwarf/DefenseController.js";
import RedDwarfNavigationController from "../../students/RedDwarf/NavigationController.js";
import RedDwarfPropulsionController from "../../students/RedDwarf/PropulsionController.js";
import RedDwarfSensorsController from "../../students/RedDwarf/SensorsController.js";
import SerenityDefenceController from "../../students/Serenity/DefenseController.js";
import SerenityNavigationController from "../../students/Serenity/NavigationController.js";
import SerenityPropulsionController from "../../students/Serenity/PropulsionController.js";
import SerenitySensorsController from "../../students/Serenity/SensorsController.js";
import SSAnneDefenceController from "../../students/SSAnne/DefenseController.js";
import SSAnneNavigationController from "../../students/SSAnne/NavigationController.js";
import SSAnnePropulsionController from "../../students/SSAnne/PropulsionController.js";
import SSAnneSensorsController from "../../students/SSAnne/SensorsController.js";
import Thunderbird3DefenceController from "../../students/Thunderbird3/DefenseController.js";
import Thunderbird3NavigationController from "../../students/Thunderbird3/NavigationController.js";
import Thunderbird3PropulsionController from "../../students/Thunderbird3/PropulsionController.js";
import Thunderbird3SensorsController from "../../students/Thunderbird3/SensorsController.js";
import YamatoDefenceController from "../../students/Yamato/DefenseController.js";
import YamatoNavigationController from "../../students/Yamato/NavigationController.js";
import YamatoPropulsionController from "../../students/Yamato/PropulsionController.js";
import YamatoSensorsController from "../../students/Yamato/SensorsController.js";
const buildAllShips = (pos, game, startProcess) => {
    const shipNames = ["Bebop", "Bismark", "Enterprise", "EventHorizon", "Flying Dutchman", "Galactica", "Milano", "Normandy", "Nostromo", "Pillar Of Autumn", "Planet Express", "Rama", "Red Dwarf", "Serenity", "ssAnne", "Thunderbird III", "Yamato"];
    let ships = [];
    shipNames.forEach((shipName) => {
        let newShip = buildShip(shipName, pos, game, startProcess);
        if (newShip)
            ships.push(); //Build each ship into array to return
        else
            throw Error("Failed to build ship");
    });
    return ships;
};
const buildShip = (shipName, pos, game, startProcess) => {
    switch (shipName) {
        case "Bebop":
        case "bebop":
            return new ColonyShip("Bebop", startProcess, BebopDefenceController, BebopNavigationController, BebopPropulsionController, BebopSensorsController, pos, game);
        case "Bismark":
            return new ColonyShip("Bismark", startProcess, BismarkDefenceController, BismarkNavigationController, BismarkPropulsionController, BismarkSensorsController, pos, game);
        case "Enterprise":
            return new ColonyShip("Enterprise", startProcess, EnterpriseDefenceController, EnterpriseNavigationController, EnterprisePropulsionController, EnterpriseSensorsController, pos, game);
        case "Event Horizon":
            return new ColonyShip("Event Horizon", startProcess, EventHorizonDefenceController, EventHorizonNavigationController, EventHorizonPropulsionController, EventHorizonSensorsController, pos, game);
        case "Flying Dutchman":
            return new ColonyShip("Flying Dutchman", startProcess, FlyingDutchmanDefenceController, FlyingDutchmanNavigationController, FlyingDutchmanPropulsionController, FlyingDutchmanSensorsController, pos, game);
        case "Galactica":
            return new ColonyShip("Flying Dutchman", startProcess, GalacticaDefenceController, GalacticaNavigationController, GalacticaPropulsionController, GalacticaSensorsController, pos, game);
        case "Milano":
            return new ColonyShip("Milano", startProcess, MilanoDefenceController, MilanoNavigationController, MilanoPropulsionController, MilanoSensorsController, pos, game);
        case "Normandy":
            return new ColonyShip("Normandy", startProcess, NormandyDefenceController, NormandyNavigationController, NormandyPropulsionController, NormandySensorsController, pos, game);
        case "Nostromo":
            return new ColonyShip("Nostromo", startProcess, NostromoDefenceController, NostromoNavigationController, NostromoPropulsionController, NostromoSensorsController, pos, game);
        case "Pillar Of Autumn":
            return new ColonyShip("Pillar Of Autumn", startProcess, PillarOfAutumnDefenceController, PillarOfAutumnNavigationController, PillarOfAutumnPropulsionController, PillarOfAutumnSensorsController, pos, game);
        case "Planet Express":
            return new ColonyShip("Planet Express", startProcess, PlanetExpressDefenceController, PlanetExpressNavigationController, PlanetExpressPropulsionController, PlanetExpressSensorsController, pos, game);
        case "Rama":
            return new ColonyShip("Rama", startProcess, RamaDefenceController, RamaNavigationController, RamaPropulsionController, RamaSensorsController, pos, game);
        case "Red Dwarf":
            return new ColonyShip("Red Dwarf", startProcess, RedDwarfDefenceController, RedDwarfNavigationController, RedDwarfPropulsionController, RedDwarfSensorsController, pos, game);
        case "Serenity":
            return new ColonyShip("Serenity", startProcess, SerenityDefenceController, SerenityNavigationController, SerenityPropulsionController, SerenitySensorsController, pos, game);
        case "ssAnne":
            return new ColonyShip("ssAnne", startProcess, SSAnneDefenceController, SSAnneNavigationController, SSAnnePropulsionController, SSAnneSensorsController, pos, game);
        case "Thunderbird III":
            return new ColonyShip("Thunderbird III", startProcess, Thunderbird3DefenceController, Thunderbird3NavigationController, Thunderbird3PropulsionController, Thunderbird3SensorsController, pos, game);
        case "Yamato":
            return new ColonyShip("Yamato", startProcess, YamatoDefenceController, YamatoNavigationController, YamatoPropulsionController, YamatoSensorsController, pos, game);
        default:
            throw Error("Invalid ship name");
    }
};
export { buildShip, buildAllShips };
