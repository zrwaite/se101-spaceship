// import { ShipNames } from '../../Scripts/ShipNames.js';

export class ShipSelectPanel /* extends PanelContainer */ {

    constructor() {
        this.gameCore = null; // GameCore
        this.optionButton = null; // OptionButton

        this.onShipSelectionChanged = null; // event Action<ShipNames> 
    }

    /**
     * Called when the node enters the scene tree for the first time.
     */
    _Ready() {
        // optionButton = FindNode("OptionButton") as OptionButton;

        // gameCore = FindParent("GameCore") as GameCore;
        // gameCore.OnColonyShipSpawned += HandleColonyShipSpawned;

        for (const pair of gameCore.ColonyShips) {
            optionButton.AddItem(pair.Value.ShipName.ToString());
        }
    }

    /**
     * Updates focused ship in optionButton to argument
     * @param {ColonyShip} ship
     */
    setFocusShip(ship) {
        for (let i = 0; i < optionButton.GetItemCount(); i++) {
            if (optionButton.GetItemText(i).CompareTo(ship.ShipName.ToString()) == 0) {
                optionButton.Select(i);
            }
        }
    }
    
    /**
     * Add new ship to optionButton panel
     * @param {ColonyShip} newColonyShip 
     */
    handleColonyShipSpawned(newColonyShip) {
        optionButton.AddItem(newColonyShip.ShipName.ToString());
    }

    /**
     * Update selected ship in optionButton on item select
     * @param {int} id 
     */
    handleOptionButtonItemSelected(id) {        
        if (onShipSelectionChanged) {
            onShipSelectionChanged(ShipNames[optionButton.GetItemText(id)]);
        }
    }
}
