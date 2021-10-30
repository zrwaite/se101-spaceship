import { Node2D, FindNode, GetNode } from '<SOMEWHERE>';
import Vector2 from '../Helpers/Vector2.js';

export default class GalaxyMapEdge extends Node2D {

  constructor() {
    this.nodeAPath = null;  // NodePath
    this.nodeBPath = null;  // NodePath
    this.edgeCost = 1;      // float
    this.cost = null;       // Label
    this.nodeA = null;      // GalaxyMapNode
    this.nodeB = null;      // GalaxyMapNode
    this.line = null;       // Node2D
  }

  // Define getters and setters
  get NodeA() { return this.nodeA; }
  set NodeA(value) { this.nodeA = value; }

  get NodeB() { return this.nodeB; }
  set NodeB(value) { this.nodeB = value; }

  get Line() { return this.line; }
  set Line(value) { this.line = value; }

  get EdgeCost() { return this.edgeCost; }
  set EdgeCost(value) { this.edgeCost = value; }

  // Called when the node enters the scene tree for the first time.
  // @Override
  _Ready() {
    this.ConnectNodeEndpoints();
    this.cost = FindNode("EdgeCost"); // as Label;
  }

  /**
   *
   * @returns void
   */
  ConnectNodeEndpoints() {
    try {
        console.log("Connecting Node endpoints - " + this.nodeAPath + " to " + this.nodeBPath);
        // Pass in type as optional second param
        this.nodeA = GetNode(this.nodeAPath, "GalaxyMapNode");
        this.nodeB = GetNode(this.nodeBPath, "GalaxyMapNode");
        this.line = GetNode("Line", "Node2D");
    } catch (ex) {
      console.error("Exception: " + ex);
    }
  }

  // Called every frame. 'delta' is the elapsed time since the previous frame.
  /**
   *
   * @param {float} delta
   * @returns void
   */
  _Process(delta) {
    if (this.nodeA && this.nodeA) {
      let AtoB = this.nodeB.GlobalPosition.subtract(this.nodeA.GlobalPosition); // Vector2
      this.Position = this.nodeA.GlobalPosition.add(AtoB).scale(0.5);
      this.cost.Text = this.edgeCost.ToString();
      this.line.GlobalScale = new Vector2(AtoB.Length() * 0.25, 1);
      this.line.LookAt(this.NodeB.GlobalPosition);
    } else {
      console.error("Both Node endpoints must be specified. " + this.nodeA + " : " + this.nodeB);
    }
  }
}
