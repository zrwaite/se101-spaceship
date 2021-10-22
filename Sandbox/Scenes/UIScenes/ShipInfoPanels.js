import { ShipNames } from '../../Scripts/ShipNames.js';

export class ShipInfoPanels /* extends VBoxContainer */ {

    constructor() {
        this.gameCore = null; // GameCore
        this.shipSelectPanel = null; // ShipSelectPanel
        this.sensorsSubsystemInformationPanel = null; // SensorsSubsystemInformationPanel
        this.propulsionSubsystemInformationPanel = null; // PropulsionSubsystemInfoPanel
        this.defenceSubsystemInformationPanel = null; // DefenceSubsystemInformationPanel
        this.focusShip = null; // ColonyShip
        // public ColonyShip FocusShip { get { return focusShip; } set { if (focusShip != value) { var oldValue = focusShip; focusShip = value; FocusShipChanged?.Invoke(oldValue, focusShip); } } }
        // public event Action<ColonyShip, ColonyShip> FocusShipChanged; //Old focus, new focus
    }

    // Getter and setter for focusShip (need to update event Action FocusShipChanged)
    get FocusShip() { return this.focusShip; }
    // set FocusShip(value) { if (this.focusShip != value) { let oldValue = this.focusShip; this.focusShip = value; FocusShipChanged?.Invoke(oldValue, focusShip); } }


    /**
     * Called when the node enters the scene tree for the first time.
     */
    _Ready() {
        gameCore = FindParent("GameCore"); // as GameCore

        shipSelectPanel = FindNode("ShipSelectPanel"); // as ShipSelectPanel
        shipSelectPanel.OnShipSelectionChanged += HandleShipSelectionChanged;

        sensorsSubsystemInformationPanel = FindNode("SensorsSubsystemInformationPanel"); // as SensorsSubsystemInformationPanel
        propulsionSubsystemInformationPanel = FindNode("PropulsionSubsystemInformationPanel"); // as SensorsSubsystemInformationPanel
        defenceSubsystemInformationPanel = FindNode("DefenceSubsystemInformationPanel"); // as SensorsSubsystemInformationPanel

        FocusShipChanged += HandleFocusShipChanged;
    }

    /**
     * 
     * @param {float} delta 
     */
    _Process(delta) {
        if (FocusShip != null && !FocusShip.PropulsionController.IsProcessing) {
            //The automatic propulsion code is disable. Allow manual control of propulsion.
            if (FocusShip.ThrusterControls.IsUFODriveEnabled) {
                ComputeUFOThrusterInputs(delta);
            } else {
                ComputeManualThrusterInputs(delta);
            }
        }
    }

    /**
     * 
     * @param {ShipNames} newShipName 
     */
    handleShipSelectionChanged(newShipName) {
        if (newShipName in gameCore.ColonyShips) {
            FocusShip = gameCore.ColonyShips[newShipName];
        }
    }

    /**
     * 
     * @param {ColonyShip} oldFocusShip 
     * @param {ColonyShip} newFocusShip 
     */
    handleFocusShipChanged(oldFocusShip, newFocusShip) {
        // Unsubscribe
        if (oldFocusShip != null) {
            oldFocusShip.OnShipWarped -= HandleFocusShipWarped;            
        }

        let mainCamera = gameCore.MainCamera;
        mainCamera.GetParent().RemoveChild(mainCamera);
        mainCamera.SetFocus(newFocusShip);

        let targetViewportContainer = newFocusShip.FindParent("*ViewportContainer*");
        targetViewportContainer.GetChild(0).AddChild(mainCamera);

        sensorsSubsystemInformationPanel.SetFocusShip(focusShip);
        propulsionSubsystemInformationPanel.SetFocusShip(focusShip);
        defenceSubsystemInformationPanel.SetFocusShip(focusShip);
        shipSelectPanel.SetFocusShip(focusShip);

        // Update viewport containers
        let currentViewportContainer = gameCore.SolarSystemViewportContainersByName[focusShip.CurrentSolarSystemName];
        gameCore.MoveChild(currentViewportContainer, gameCore.GetChildCount() - 1);

        // Subscribe
        focusShip.OnShipWarped += HandleFocusShipWarped;        

        // Shows/Hides mission accomplished screen 
        if (newFocusShip != null) {
            gameCore.MissionAccomplishedUI.SetFocusShip(focusShip);

            gameCore.MissionAccomplishedUI.Visible = newFocusShip.IsLanded;
        }
    }

    /**
     * 
     * @param {ColonyShip} ship
     * @param {string} oldSolarSystem 
     * @param {string} newSolarSystem 
     */
    handleFocusShipWarped(ship, oldSolarSystem, newSolarSystem) {
        if (gameCore.MainCamera.GetParent()) {
            gameCore.MainCamera.GetParent().RemoveChild(gameCore.MainCamera);
        }
        let destinationViewportContainer = gameCore.SolarSystemViewportContainersByName[newSolarSystem];
        destinationViewportContainer.GetChild(0).AddChild(gameCore.MainCamera);

        gameCore.MoveChild(destinationViewportContainer, gameCore.GetChildCount() - 1);
    }

    /**
     * 
     * @param {float} delta 
     * @returns 
     */
    computeManualThrusterInputs(delta) {
        if (focusShip == null) {
            return;
        }

        let ThrusterControls = focusShip.ThrusterControls;

        ThrusterControls.MainThrottle = 0;
        ThrusterControls.PortForeThrottle = 0;
        ThrusterControls.PortAftThrottle = 0;
        ThrusterControls.StarboardForeThrottle = 0;
        ThrusterControls.StarboardAftThrottle = 0;
        ThrusterControls.PortRetroThrottle = 0;
        ThrusterControls.StarboardRetroThrottle = 0;

        if (Input.IsActionPressed("MovementForward")) {
            ThrusterControls.MainThrottle += 1;
        }

        if (Input.IsActionPressed("MovementBackward")) {
            ThrusterControls.PortRetroThrottle += 1;
            ThrusterControls.StarboardRetroThrottle += 1;
        }

        if (Input.IsActionPressed("MovementPort")) {
            ThrusterControls.StarboardForeThrottle += 1;
            ThrusterControls.StarboardAftThrottle += 1;
        }

        if (Input.IsActionPressed("MovementStarboard")) {
            ThrusterControls.PortForeThrottle += 1;
            ThrusterControls.PortAftThrottle += 1;
        }

        if (Input.IsActionPressed("MovementCounterclockwise")) {
            ThrusterControls.PortAftThrottle += 1;
            ThrusterControls.StarboardForeThrottle += 1;
        }

        if (Input.IsActionPressed("MovementClockwise")) {
            ThrusterControls.PortForeThrottle += 1;
            ThrusterControls.StarboardAftThrottle += 1;
        }

        if (Input.IsActionJustPressed("FireTorpedo")) {
            focusShip.Turret.TurretControls.TriggerTube(0, 0);
        }

        if (Input.IsActionJustPressed("TriggerJumpDrive")) {
            ThrusterControls.TriggerWarpJump();
        }

        if (Input.IsActionJustPressed("TriggerLandingSequence")) {
            ThrusterControls.TriggerLandingSequence();
        }
    }

    /**
     * 
     * @param {float} delta 
     * @returns 
     */
    computeUFOThrusterInputs(delta) {
        if (focusShip == null)
            return;

        let ThrusterControls = focusShip.ThrusterControls;

        ThrusterControls.UFODriveVelocity = Vector2.Zero;
        ThrusterControls.UFODriveAngularVelocity = 0;

        if (Input.IsActionPressed("MovementForward")) {
            ThrusterControls.UFODriveVelocity += Vector2.Up;
        }

        if (Input.IsActionPressed("MovementBackward")) {
            ThrusterControls.UFODriveVelocity += Vector2.Down;
        }

        if (Input.IsActionPressed("MovementPort")) {
            ThrusterControls.UFODriveVelocity += Vector2.Left;
        }

        if (Input.IsActionPressed("MovementStarboard")) {
            ThrusterControls.UFODriveVelocity += Vector2.Right;
        }

        if (Input.IsActionPressed("MovementClockwise")) {
            ThrusterControls.UFODriveAngularVelocity += focusShip.UFODriveRotationSpeed * delta;
        }

        if (Input.IsActionPressed("MovementCounterclockwise")) {
            ThrusterControls.UFODriveAngularVelocity -= focusShip.UFODriveRotationSpeed * delta;
        }

        ThrusterControls.UFODriveVelocity = ThrusterControls.UFODriveVelocity.Normalized();

        if (Input.IsActionJustPressed("FireTorpedo")) {
            focusShip.Turret.TurretControls.TriggerTube(0, 0);
        }
    }
}
