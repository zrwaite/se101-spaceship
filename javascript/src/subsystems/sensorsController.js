export default class SensorsController {
    constructor() {
        this.initializeConnection = (defence, navigation, propulsion) => {
            this.defence = defence;
            this.propulsion = propulsion;
            this.navigation = navigation;
        };
        this.target = null;
        // @ts-ignore
        this.navigation = null;
        // @ts-ignore
        this.defence = null;
        // @ts-ignore
        this.propulsion = null;
    }
    sensorsUpdate(activeScan, passiveScan) {
        const scanResult = passiveScan();
        if (!(scanResult instanceof Error))
            this.target = scanResult[0];
    }
}
