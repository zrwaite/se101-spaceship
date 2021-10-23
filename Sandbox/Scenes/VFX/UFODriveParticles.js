using Godot;
using System;

public class UFODriveParticles : Node2D
{
    Particles2D ringParticles;

    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        ringParticles = GetNode<Particles2D>("RingParticles");
        ringParticles.Emitting = false;
    }

    public void SetEmitting(bool isEmitting)
    {
        ringParticles.Emitting = isEmitting;
    }
}
