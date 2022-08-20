import { getShipStatusType, tryLandType, tryWarpType } from '../ship/colonyShip.js'
import { MapData } from '../ship/mapData.js'
import SubsystemController from './subsystemController.js'

export default class NavigationController extends SubsystemController {
	navigationUpdate(getShipStatus: getShipStatusType, warp: tryWarpType, land: tryLandType, getMapData: () => MapData) {}
}
