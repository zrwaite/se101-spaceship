import { MapData } from '../ship/mapData.js'
import { ShipStatus } from '../ship/shipStatus.js'
import SubsystemController from './subsystemController.js'

export default class NavigationController extends SubsystemController {
	navigationUpdate(getShipStatus: (key: keyof ShipStatus) => number, warp: () => Error|null, land: () => Error|null, getMapData: () => MapData) {}
}
