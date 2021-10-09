//Based on IPassiveSensors.cs

export default class IPassiveSensors{
    constructor(){
        this.PassiveReadings = []; //PassiveSensorReadings
        this.InterferenceScale; //number
        this.GConstant; //number
    }
}
