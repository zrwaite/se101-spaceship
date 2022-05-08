export default class SubsystemController {
    constructor() {
        this.defence = null;
        this.navigation = null;
        this.propulsion = null;
        this.sensors = null;
        this.initialized = false;
        this.initializeConnection = (defence, navigation, propulsion, sensors) => {
            this.defence = defence;
            this.navigation = navigation;
            this.propulsion = propulsion;
            this.sensors = sensors;
            this.initialized = true;
        };
    }
}
