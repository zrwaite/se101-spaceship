using Godot;
using System;

public class GalaxyMapNode : Node2D
{
    // Declare member variables here. Examples:
    // private int a = 2;
    // private string b = "text";

    Label SystemName;

    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        SystemName = FindNode("SystemName") as Label;
        SystemName.Text = this.Name;
    }

    //  // Called every frame. 'delta' is the elapsed time since the previous frame.
    //  public override void _Process(float delta)
    //  {
    //      
    //  }
}
