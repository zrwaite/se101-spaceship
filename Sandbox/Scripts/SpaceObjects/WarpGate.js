
export default class WarpGate /* extends Area2D */ {

    // [Export] string destinationSolarSystemName;

    //Properties
    // public string DestinationSolarSystemName { get { return destinationSolarSystemName; } }

    constructor() {
        this.gameCore = null;
        this.destinationSolarSystemName = null;
        this.currentSolarSystemName = null;
    }

    get DestinationSolarSystemName() { return this.destinationSolarSystemName; }

    _Ready() {
        this.gameCore = FindParent("GameCore"); // as GameCore;
        this.currentSolarSystemName = GetParent().GetParent().name;
    }

    /**
     * Test if ship can teleport to destination. Update newSolarSystemName if applicable
     * @param {ColonyShip} ship 
     * @param {string} newSolarSystemName Needs to update by reference
     * @param {float} jumpCost Needs to update by reference
     * @returns boolean
     */
    tryTeleportShip(ship, newSolarSystemName, jumpCost) {
        if (destinationSolarSystemName == null) {
            newSolarSystemName = currentSolarSystemName;
            jumpCost = 0;
            return false;
        }

        let edgeCost = -1;
        for (const edgeData of gameCore.GalaxyMap.GalaxyMapData.edgeData) {
            if (edgeData.nodeA.systemName == currentSolarSystemName) {
                if (edgeData.nodeB.systemName == destinationSolarSystemName) {
                    edgeCost = edgeData.edgeCost;
                    break;
                }
            } else if (edgeData.nodeB.systemName == currentSolarSystemName) {
                if (edgeData.nodeA.systemName == destinationSolarSystemName) {
                    edgeCost = edgeData.edgeCost;
                    break;
                }
            }
        }
        if (edgeCost == -1) {
            newSolarSystemName = currentSolarSystemName;
            jumpCost = 0;
            return false;
        }

        //Record the ship's position offset relative to this outbound gate
        // Vector2 positionOffset = ship.GlobalPosition - this.GlobalPosition; /* NEED TO IMPLEMENT OPERATION FOR VECTOR DIFFERENCE */

        //Add ship to new solar system
        ship.GetParent()?.RemoveChild(ship);
        var destinationSolarSystem = gameCore.SolarSystemViewportContainersByName[destinationSolarSystemName].GetChild(0).GetChild(0);
        destinationSolarSystem.AddChild(ship);



        //Find the incoming warpgate and position the ship relative to it
        let targetNode = destinationSolarSystem.FindNode("WarpGate to " + currentSolarSystemName, true);
        let incomingWarpGate = targetNode; //as WarpGate;
        ship.GlobalPosition = incomingWarpGate.GlobalPosition + positionOffset;
        ship.CurrentSolarSystemName = incomingWarpGate.currentSolarSystemName;

        newSolarSystemName = incomingWarpGate.currentSolarSystemName;
        jumpCost = edgeCost;


        return true;
    }
}
