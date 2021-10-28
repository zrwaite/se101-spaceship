
export class PropulsionSubsystemInfoPanel /* extends Control */ {

    constructor() {
        this.focusShip = null; // ColonyShip

        this.driveSelectOptionButton = null; // OptionButton

        // Label type
        this.mainThrusterLabel = null;
        this.portForeThrusterLabel = null;
        this.portAftThrusterLabel = null;
        this.starboardForeThrusterLabel = null;
        this.starboardAftThrusterLabel = null;
        this.portRetroThrusterLabel = null;
        this.starboardRetroThrusterLabel = null;

        // TextureProgress type
        this.mainThrusterProgressBar = null;
        this.portForeThrusterProgressBar = null;
        this.portAftThrusterProgressBar = null;
        this.starboardForeThrusterProgressBar = null;
        this.starboardAftThrusterProgressBar = null;
        this.portRetroThrusterProgressBar = null;
        this.starboardRetroThrusterProgressBar = null;

        // Checkbox type
        this.automaticControllerCheckBox = null;
        this.ufoDriveCheckBox = null;
    }
    
    /**
     * Called when the node enters the scene tree for the first time.
     */
    _Ready() {
        automaticControllerCheckBox = FindNode("AutomaticControllerCheckBox"); // as CheckBox
        automaticControllerCheckBox.Connect("toggled", this, nameof(HandleAutomaticControllerCheckBoxChanged));
        ufoDriveCheckBox = FindNode("UFODriveCheckBox"); // as CheckBox
        ufoDriveCheckBox.Connect("toggled", this, nameof(HandleUFODriveCheckBoxChanged));

        driveSelectOptionButton = FindNode("DriveSelectOptionButton"); // as OptionButton
        //driveSelectOptionButton.Connect("item_selected", this, nameof(HandleDriveItemSelected));        

        mainThrusterLabel = FindNode("Main Thruster"); // as Label
        portForeThrusterLabel = FindNode("Port Fore Thruster"); // as Label
        portAftThrusterLabel = FindNode("Port Aft Thruster"); // as Label
        starboardForeThrusterLabel = FindNode("Starboard Fore Thruster"); // as Label
        starboardAftThrusterLabel = FindNode("Starboard Aft Thruster"); // as Label
        portRetroThrusterLabel = FindNode("Port Retro Thruster"); // as Label
        starboardRetroThrusterLabel = FindNode("Starboard Retro Thruster"); // as Label

        mainThrusterProgressBar = FindNode("MainThrusterProgressBar"); // as TextureProgress
        portForeThrusterProgressBar = FindNode("PortForeThrusterProgressBar"); // as TextureProgress
        portAftThrusterProgressBar = FindNode("PortAftThrusterProgressBar"); // as TextureProgress
        starboardForeThrusterProgressBar = FindNode("StarboardForeThrusterProgressBar"); // as TextureProgress
        starboardAftThrusterProgressBar = FindNode("StarboardAftThrusterProgressBar"); // as TextureProgress
        portRetroThrusterProgressBar = FindNode("PortRetroThrusterProgressBar"); // as TextureProgress
        starboardRetroThrusterProgressBar = FindNode("StarboardRetroThrusterProgressBar"); // as TextureProgress
    }


    /**
     * 
     * @param {float} delta 
     * @returns 
     */
    _Process(delta) {
        if (focusShip == null) {
            return;
        }

        mainThrusterProgressBar.Value = focusShip.ThrusterControls.MainThrottle;
        portForeThrusterProgressBar.Value = focusShip.ThrusterControls.PortForeThrottle;
        portAftThrusterProgressBar.Value = focusShip.ThrusterControls.PortAftThrottle;
        starboardForeThrusterProgressBar.Value = focusShip.ThrusterControls.StarboardForeThrottle;
        starboardAftThrusterProgressBar.Value = focusShip.ThrusterControls.StarboardAftThrottle;
        portRetroThrusterProgressBar.Value = focusShip.ThrusterControls.PortRetroThrottle;
        starboardRetroThrusterProgressBar.Value = focusShip.ThrusterControls.StarboardRetroThrottle;
    }

    /**
     * Unsubscribe from old ship and subscribe to input ship
     * @param {ColonyShip} ship 
     */
    setFocusShip(ship) {
        //Unsubscribe from old
        if (focusShip != null) {
            focusShip.PropulsionController.IsProcessingChanged -= HandlePropulsionControllerProcessingChanged;
            focusShip.ThrusterControls.OnUFODriveEnabledChanged -= HandleUFODriveEnabledChanged;
            //focusShip.OnPropulsionModeChanged -= HandleShipPropulsionModeChanged;
            focusShip = null;
        }

        //Subscribe to new
        focusShip = ship;
        focusShip.PropulsionController.IsProcessingChanged += HandlePropulsionControllerProcessingChanged;
        focusShip.ThrusterControls.OnUFODriveEnabledChanged += HandleUFODriveEnabledChanged;

        HandlePropulsionControllerProcessingChanged(focusShip.PropulsionController, focusShip.PropulsionController.IsProcessing);
        HandleUFODriveCheckBoxChanged(focusShip.ThrusterControls.IsUFODriveEnabled);
        //focusShip.OnPropulsionModeChanged += HandleShipPropulsionModeChanged;
        //HandleShipPropulsionModeChanged(focusShip, focusShip.PropulsionMode);
    }

    /**
     * 
     * @param {boolean} pressed 
     */
    handleAutomaticControllerCheckBoxChanged(pressed) {
        synchronizePropulsionMode();
    }

    /**
     * 
     * @param {boolean} pressed 
     */
    handleUFODriveCheckBoxChanged(pressed) {
        synchronizePropulsionMode();
    }

    /**
     * 
     */
    synchronizePropulsionMode() {
        if (focusShip == null) {
            return;
        }

        focusShip.PropulsionController.IsProcessing = automaticControllerCheckBox.Pressed;        
        focusShip.ThrusterControls.IsUFODriveEnabled = ufoDriveCheckBox.Pressed;

    }

    /*
    void HandleDriveItemSelected(int index)
    {
        GD.Print("Drive item selected: " + index);
        focusShip.PropulsionMode = (ShipPropulsionMode)index;
    }

    void HandleShipPropulsionModeChanged(ColonyShip ship, ShipPropulsionMode newPropulsionMode)
    {
        GD.Print("ColonyShip propulsion mode changed: " + newPropulsionMode);
        driveSelectOptionButton.Selected = (int)newPropulsionMode;
    }*/

    /**
     * 
     * @param {AbstractSubsystemController} controller 
     * @param {boolean} isEnabled 
     */
    handlePropulsionControllerProcessingChanged(controller, isEnabled) {
        automaticControllerCheckBox.Pressed = isEnabled;

        //If the automatic propulsion controller is enabled, don't allow the user to affect the UFO drive checkbox
        //The pressed state of the checkbox should still be updated correctly, but the user can't touch it
        ufoDriveCheckBox.Disabled = isEnabled;
    }

    /**
     * 
     * @param {boolean} isEnabled 
     */
    handleUFODriveEnabledChanged(isEnabled) {
        ufoDriveCheckBox.Pressed = isEnabled;
    }
}
