import { Node2D, FindNode } from '<SOMEWHERE>';

export default class GalaxyMapNode extends Node2D {

  constructor() {
    this.SystemName = null;
  }

  // Called when the node enters the scene tree for the first time.
  // @Override
  _Ready() {
      this.SystemName = FindNode("SystemName"); // as Label;
      this.SystemName.Text = this.Name;
  }
}
