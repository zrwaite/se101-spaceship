import APIResponse from '../helpers/response.js'
import Vector2 from '../helpers/Vector2.js'
import { tryLandType, tryWarpType } from '../ship/colonyShip.js'
import { ShipStatus } from '../ship/shipStatus.js'
import { MapData } from '../solarSystem.js'
import SubsystemController from './subsystemController.js'

export default class NavigationController extends SubsystemController {
	navigationUpdate(shipStatusInfo: ShipStatus, warp: tryWarpType, land: tryLandType, mapData: MapData) {}
}
