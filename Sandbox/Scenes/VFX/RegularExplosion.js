using Godot;
using System;

public class RegularExplosion : Node2D
{
    // Declare member variables here. Examples:
    // private int a = 2;
    // private string b = "text";

    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        var animator = FindNode("AnimationPlayer") as AnimationPlayer;
        animator.Play("Explosion");
        
        Random rand = new Random();
        Rotation = (float)rand.NextDouble() * 360f;
    }

//  // Called every frame. 'delta' is the elapsed time since the previous frame.
//  public override void _Process(float delta)
//  {
//      
//  }
}
