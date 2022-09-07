export default class PropulsionController {
    constructor() {
        this.initializeConnection = (defence, navigation, sensors) => {
            this.defence = defence;
            this.navigation = navigation;
            this.sensors = sensors;
        };
        // @ts-ignore
        this.navigation = null;
        // @ts-ignore
        this.defence = null;
        // @ts-ignore
        this.sensors = null;
    }
    propulsionUpdate(setThruster) { }
}
