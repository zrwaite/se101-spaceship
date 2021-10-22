
export default class SensorsSubsystemInformationPanel /* extends Control */ {
    
    constructor() {
        this.focusShip = null; // ColonyShip
        this.infoText = null; // Label
    }

    // Called when the node enters the scene tree for the first time.
    _Ready() {
        infoText = FindNode("InfoText"); // as Label
    }


    /**
     * 
     * @param {float} delta 
     * @returns void
     */
    _Process(delta) {
        if(focusShip == null) {
            infoText.Text = "No Ship Selected";
            return;
        }
        
        //int nearbyReadingsCount = focusShip.ActiveSensors.EMSReadings.Count;

        infoText.Text = 
        "Total Jump Cost: " + focusShip.TotalJumpCost 
        + "\n Time: " + focusShip.TimeElapsed.ToString("0.000")
        + "\n Scan Energy: " + focusShip.TotalScanEnergy.ToString("0.00");
    }

    /**
     * 
     * @param {ColonyShip} ship 
     * @returns void
     */
    setFocusShip(ship) {
        this.focusShip = ship;
    }
}
