export default class NavigationController {
    constructor() {
        this.initializeConnection = (defence, propulsion, sensors) => {
            this.defence = defence;
            this.propulsion = propulsion;
            this.sensors = sensors;
        };
        // @ts-ignore
        this.defence = null;
        // @ts-ignore
        this.propulsion = null;
        // @ts-ignore
        this.sensors = null;
        // @ts-ignore
        this.angle = 0;
    }
    navigationUpdate(getShipStatus, warp, land, getMapData) { }
}
