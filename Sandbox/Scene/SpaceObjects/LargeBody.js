export class LargeBody /* extends Area2D, IHasScanSignature */ {
    constructor() {
        this.gravitySignature = null;                                       //GravitySignature
        this.scanSignature = "RareGases:80|Neutronium:5|Unknown:15";        //string
    }

    //Properties
    get GravitySignature(){
        return gravitySignature;
    } 
    set GravitySignature(value){ 
        gravitySignature = value; 
    }
    get ScanSignature() {
        return scanSignature;
    }

}
