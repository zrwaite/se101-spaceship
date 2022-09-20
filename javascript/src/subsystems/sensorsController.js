export default class SensorsController {
    constructor() {
        this.initializeConnection = (defence, navigation, propulsion) => {
            this.defence = defence;
            this.propulsion = propulsion;
            this.navigation = navigation;
        };
        // @ts-ignore
        this.navigation = null;
        // @ts-ignore
        this.defence = null;
        // @ts-ignore
        this.propulsion = null;
        // @ts-ignore
        this.target = null;
    }
    sensorsUpdate(activeScan, passiveScan) { }
}
