
export class DefenceSubsystemInformationPanel /* extends PanelContainer */ {
    //Internal
    
    constructor() {
        this.totalCollisionsLabel = null; // Label
        this.collisionDamageLabel = null; // Label

        this.tube0ProgressBar = null; //  ProgressBar
        this.tube1ProgressBar = null; //  ProgressBar
        this.tube2ProgressBar = null; //  ProgressBar
        this.tube3ProgressBar = null; //  ProgressBar

        this.focusShip = null; // ColonyShip
    }

    /**
     * Called on initial render of component
     */
    _Ready() {
        // totalCollisionsLabel = FindNode("TotalCollisions") as Label;
        // collisionDamageLabel = FindNode("CollisionDamage") as Label;
        // tube0ProgressBar = FindNode("Tube0ProgressBar") as ProgressBar;
        // tube1ProgressBar = FindNode("Tube1ProgressBar") as ProgressBar;
        // tube2ProgressBar = FindNode("Tube2ProgressBar") as ProgressBar;
        // tube3ProgressBar = FindNode("Tube3ProgressBar") as ProgressBar;

        tube0ProgressBar.Value = 0.1;
        tube1ProgressBar.Value = 0.3;
        tube2ProgressBar.Value = 0.5;
        tube3ProgressBar.Value = 0.8;
    }

    /**
     * 
     * @param {float} delta elapsed time since previous frame
     * @returns 
     */
    _Process(delta) {
        if (focusShip == null) {
            totalCollisionsLabel.Text = "Collisions: [No ship focus]";
            collisionDamageLabel.Text = "Damage: [No ship focus]";
            tube0ProgressBar.Value = 0;
            tube1ProgressBar.Value = 0;
            tube2ProgressBar.Value = 0;
            tube3ProgressBar.Value = 0;
            return;
        }
        
        totalCollisionsLabel.Text = "Collisions: " + focusShip.TotalCollisionCount;
        collisionDamageLabel.Text = "Damage: " + focusShip.TotalDamage;
        tube0ProgressBar.Value = focusShip.Turret.GetTubeCooldown(0);
        tube1ProgressBar.Value = focusShip.Turret.GetTubeCooldown(1);
        tube2ProgressBar.Value = focusShip.Turret.GetTubeCooldown(2);
        tube3ProgressBar.Value = focusShip.Turret.GetTubeCooldown(3);
    }

    /**
     * 
     * @param {ColonyShip} ship 
     * @returns 
     */
    setFocusShip(ship) {
        if (ship == null) {
            console.error("Cannot setFocusShip(null)")
            // GD.PrintErr("Cannot SetFocusShip(null)");
            return;
        }

        this.focusShip = ship;

        tube0ProgressBar.MaxValue = focusShip.Turret.CooldownDuration;
        tube1ProgressBar.MaxValue = focusShip.Turret.CooldownDuration;
        tube2ProgressBar.MaxValue = focusShip.Turret.CooldownDuration;
        tube3ProgressBar.MaxValue = focusShip.Turret.CooldownDuration;
    }
}
