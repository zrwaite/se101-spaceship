import ColonyShip from "./colonyShip.js";

import BebopDefenceController from "../../SubsystemControllers/Bebop/DefenseController.js";
import BebopNavigationController from "../../SubsystemControllers/Bebop/NavigationController.js";
import BebopPropulsionController from "../../SubsystemControllers/Bebop/PropulsionController.js";
import BebopSensorsController from "../../SubsystemControllers/Bebop/SensorsController.js";

import BismarkDefenceController from "../../SubsystemControllers/Bismark/DefenseController.js";
import BismarkNavigationController from "../../SubsystemControllers/Bismark/NavigationController.js";
import BismarkPropulsionController from "../../SubsystemControllers/Bismark/PropulsionController.js";
import BismarkSensorsController from "../../SubsystemControllers/Bismark/SensorsController.js";

import EnterpriseDefenceController from "../../SubsystemControllers/Enterprise/DefenseController.js";
import EnterpriseNavigationController from "../../SubsystemControllers/Enterprise/NavigationController.js";
import EnterprisePropulsionController from "../../SubsystemControllers/Enterprise/PropulsionController.js";
import EnterpriseSensorsController from "../../SubsystemControllers/Enterprise/SensorsController.js";

import EventHorizonDefenceController from "../../SubsystemControllers/EventHorizon/DefenseController.js";
import EventHorizonNavigationController from "../../SubsystemControllers/EventHorizon/NavigationController.js";
import EventHorizonPropulsionController from "../../SubsystemControllers/EventHorizon/PropulsionController.js";
import EventHorizonSensorsController from "../../SubsystemControllers/EventHorizon/SensorsController.js";

import FlyingDutchmanDefenceController from "../../SubsystemControllers/FlyingDutchman/DefenseController.js";
import FlyingDutchmanNavigationController from "../../SubsystemControllers/FlyingDutchman/NavigationController.js";
import FlyingDutchmanPropulsionController from "../../SubsystemControllers/FlyingDutchman/PropulsionController.js";
import FlyingDutchmanSensorsController from "../../SubsystemControllers/FlyingDutchman/SensorsController.js";

import GalacticaDefenceController from "../../SubsystemControllers/Galactica/DefenseController.js";
import GalacticaNavigationController from "../../SubsystemControllers/Galactica/NavigationController.js";
import GalacticaPropulsionController from "../../SubsystemControllers/Galactica/PropulsionController.js";
import GalacticaSensorsController from "../../SubsystemControllers/Galactica/SensorsController.js";

import MilanoDefenceController from "../../SubsystemControllers/Milano/DefenseController.js";
import MilanoNavigationController from "../../SubsystemControllers/Milano/NavigationController.js";
import MilanoPropulsionController from "../../SubsystemControllers/Milano/PropulsionController.js";
import MilanoSensorsController from "../../SubsystemControllers/Milano/SensorsController.js";

import NormandyDefenceController from "../../SubsystemControllers/Normandy/DefenseController.js";
import NormandyNavigationController from "../../SubsystemControllers/Normandy/NavigationController.js";
import NormandyPropulsionController from "../../SubsystemControllers/Normandy/PropulsionController.js";
import NormandySensorsController from "../../SubsystemControllers/Normandy/SensorsController.js";

import NostromoDefenceController from "../../SubsystemControllers/Nostromo/DefenseController.js";
import NostromoNavigationController from "../../SubsystemControllers/Nostromo/NavigationController.js";
import NostromoPropulsionController from "../../SubsystemControllers/Nostromo/PropulsionController.js";
import NostromoSensorsController from "../../SubsystemControllers/Nostromo/SensorsController.js";

import PillarOfAutumnDefenceController from "../../SubsystemControllers/PillarOfAutumn/DefenseController.js";
import PillarOfAutumnNavigationController from "../../SubsystemControllers/PillarOfAutumn/NavigationController.js";
import PillarOfAutumnPropulsionController from "../../SubsystemControllers/PillarOfAutumn/PropulsionController.js";
import PillarOfAutumnSensorsController from "../../SubsystemControllers/PillarOfAutumn/SensorsController.js";

import PlanetExpressDefenceController from "../../SubsystemControllers/PlanetExpress/DefenseController.js";
import PlanetExpressNavigationController from "../../SubsystemControllers/PlanetExpress/NavigationController.js";
import PlanetExpressPropulsionController from "../../SubsystemControllers/PlanetExpress/PropulsionController.js";
import PlanetExpressSensorsController from "../../SubsystemControllers/PlanetExpress/SensorsController.js";

import RamaDefenceController from "../../SubsystemControllers/Rama/DefenseController.js";
import RamaNavigationController from "../../SubsystemControllers/Rama/NavigationController.js";
import RamaPropulsionController from "../../SubsystemControllers/Rama/PropulsionController.js";
import RamaSensorsController from "../../SubsystemControllers/Rama/SensorsController.js";

import RedDwarfDefenceController from "../../SubsystemControllers/RedDwarf/DefenseController.js";
import RedDwarfNavigationController from "../../SubsystemControllers/RedDwarf/NavigationController.js";
import RedDwarfPropulsionController from "../../SubsystemControllers/RedDwarf/PropulsionController.js";
import RedDwarfSensorsController from "../../SubsystemControllers/RedDwarf/SensorsController.js";

import SerenityDefenceController from "../../SubsystemControllers/Serenity/DefenseController.js";
import SerenityNavigationController from "../../SubsystemControllers/Serenity/NavigationController.js";
import SerenityPropulsionController from "../../SubsystemControllers/Serenity/PropulsionController.js";
import SerenitySensorsController from "../../SubsystemControllers/Serenity/SensorsController.js";

import SSAnneDefenceController from "../../SubsystemControllers/SSAnne/DefenseController.js";
import SSAnneNavigationController from "../../SubsystemControllers/SSAnne/NavigationController.js";
import SSAnnePropulsionController from "../../SubsystemControllers/SSAnne/PropulsionController.js";
import SSAnneSensorsController from "../../SubsystemControllers/SSAnne/SensorsController.js";

import Thunderbird3DefenceController from "../../SubsystemControllers/Thunderbird3/DefenseController.js";
import Thunderbird3NavigationController from "../../SubsystemControllers/Thunderbird3/NavigationController.js";
import Thunderbird3PropulsionController from "../../SubsystemControllers/Thunderbird3/PropulsionController.js";
import Thunderbird3SensorsController from "../../SubsystemControllers/Thunderbird3/SensorsController.js";

import YamatoDefenceController from "../../SubsystemControllers/Yamato/DefenseController.js";
import YamatoNavigationController from "../../SubsystemControllers/Yamato/NavigationController.js";
import YamatoPropulsionController from "../../SubsystemControllers/Yamato/PropulsionController.js";
import YamatoSensorsController from "../../SubsystemControllers/Yamato/SensorsController.js";

const buildShip = (shipName, pos, game, startProcess) => {
	switch (shipName){
		case "Bebop": case "bebop":
			return new ColonyShip(
				"Bebop", startProcess,
				BebopDefenceController, 
				BebopNavigationController, 
				BebopPropulsionController, 
				BebopSensorsController,
				pos, game
			); 
		case "Bismark":
			return new ColonyShip(
				"Bismark", startProcess,
				BismarkDefenceController,
				BismarkNavigationController,
				BismarkPropulsionController,
				BismarkSensorsController,
				pos, game
			);
		case "Enterprise":
			return new ColonyShip(
				"Enterprise", startProcess,
				EnterpriseDefenceController,
				EnterpriseNavigationController,
				EnterprisePropulsionController,
				EnterpriseSensorsController,
				pos, game
			);
		case "Event Horizon":
			return new ColonyShip(
				"Event Horizon", startProcess,
				EventHorizonDefenceController,
				EventHorizonNavigationController,
				EventHorizonPropulsionController,
				EventHorizonSensorsController,
				pos, game
			);

		case "Flying Dutchman":
			return new ColonyShip(
				"Flying Dutchman", startProcess,
				FlyingDutchmanDefenceController,
				FlyingDutchmanNavigationController,
				FlyingDutchmanPropulsionController,
				FlyingDutchmanSensorsController,
				pos, game
			);
		case "Galactica":
			return new ColonyShip(
				"Flying Dutchman", startProcess,
				GalacticaDefenceController,
				GalacticaNavigationController,
				GalacticaPropulsionController,
				GalacticaSensorsController,
				pos, game
			);
		case "Milano":
			return new ColonyShip(
				"Milano", startProcess,
				MilanoDefenceController,
				MilanoNavigationController,
				MilanoPropulsionController,
				MilanoSensorsController,
				pos, game
			);
		case "Normandy":
			return new ColonyShip(
				"Normandy", startProcess,
				NormandyDefenceController,
				NormandyNavigationController,
				NormandyPropulsionController,
				NormandySensorsController,
				pos, game
			);
		case "Nostromo":
			return new ColonyShip(
				"Nostromo",  startProcess,
				NostromoDefenceController,
				NostromoNavigationController,
				NostromoPropulsionController,
				NostromoSensorsController,
				pos, game
			);
		case "Pillar Of Autumn":
			return new ColonyShip(
				"Pillar Of Autumn",  startProcess,
				PillarOfAutumnDefenceController,
				PillarOfAutumnNavigationController,
				PillarOfAutumnPropulsionController,
				PillarOfAutumnSensorsController,
				pos, game
			);
		case "Planet Express":
			return new ColonyShip(
				"Planet Express", startProcess, 
				PlanetExpressDefenceController,
				PlanetExpressNavigationController,
				PlanetExpressPropulsionController,
				PlanetExpressSensorsController,
				pos, game
			);
		case "Rama":
			return new ColonyShip(
				"Rama", startProcess,
				RamaDefenceController,
				RamaNavigationController,
				RamaPropulsionController,
				RamaSensorsController,
				pos, game
			);
		case "Red Dwarf":
			return new ColonyShip(
				"Red Dwarf", startProcess, 
				RedDwarfDefenceController,
				RedDwarfNavigationController,
				RedDwarfPropulsionController,
				RedDwarfSensorsController,
				pos, game
			);
		case "Serenity":
			return new ColonyShip(
				"Serenity", startProcess, 
				SerenityDefenceController,
				SerenityNavigationController,
				SerenityPropulsionController,
				SerenitySensorsController,
				pos, game
			);
		case "ssAnne":
			return new ColonyShip(
				"ssAnne", startProcess, 
				SSAnneDefenceController,
				SSAnneNavigationController,
				SSAnnePropulsionController,
				SSAnneSensorsController,
				pos, game
			);
		case "Thunderbird III":
			return new ColonyShip(
				"Thunderbird III", startProcess,
				Thunderbird3DefenceController,
				Thunderbird3NavigationController,
				Thunderbird3PropulsionController,
				Thunderbird3SensorsController,
				pos, game
			);
		case "Yamato":
			return new ColonyShip(
				"Yamato", startProcess, 
				YamatoDefenceController,
				YamatoNavigationController,
				YamatoPropulsionController,
				YamatoSensorsController,
				pos, game
			);

		// fill out cases for all ships
		case "All": case "all":
			const shipNames = ["Bebop", "Bismark", "Enterprise", "EventHorizon", "Flying Dutchman", "Galactica", "Milano", "Normandy", "Nostromo", "Pillar Of Autumn", "Planet Express", "Rama", "Red Dwarf", "Serenity", "ssAnne", "Thunderbird III", "Yamato"];
			let ships = []; 
			shipNames.forEach((shipName) => {
				ships.push(buildShip(shipName, pos, game, startProcess)); //Build each ship into array to return
			})
			return ships;
	}
}	
export {buildShip};