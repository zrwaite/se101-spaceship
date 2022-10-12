export default class DefenceController {
    constructor() {
        this.initializeConnection = (navigation, propulsion, sensors) => {
            this.navigation = navigation;
            this.propulsion = propulsion;
            this.sensors = sensors;
        };
        // @ts-ignore
        this.navigation = null;
        // @ts-ignore
        this.propulsion = null;
        // @ts-ignore
        this.sensors = null;
    }
    defenceUpdate(aimTurret, getTubeCooldown, fireTorpedo) {
        if (!this.sensors.target)
            return;
        aimTurret(this.sensors.target.heading);
        fireTorpedo(0);
    }
}
