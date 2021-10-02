using System;
using Godot;

public abstract class AbstractSubsystemController : Node2D
{
    bool isProcessing = true;
    public event Action<AbstractSubsystemController, bool> IsProcessingChanged;
    public bool IsProcessing {get{return isProcessing;} set{if(isProcessing != value){isProcessing = value; IsProcessingChanged.Invoke(this, isProcessing);}}}

    public ColonyShip parentShip;

    static Godot.Font debugFont;
    static Godot.Font DebugFont { get { if (debugFont == null) { debugFont = Godot.GD.Load<Font>("res://Sandbox/Fonts/DebugFont.tres"); } return debugFont; } }
    // Called every frame. 'delta' is the elapsed time since the previous frame.
    public override void _Process(float delta)
    {
        Update();
    }

    public override void _Draw()
    {
        DrawSetTransformMatrix(GetGlobalTransform().Inverse());
        DebugDraw(DebugFont);
        DrawSetTransformMatrix(Transform2D.Identity);
    }

    public abstract void DebugDraw(Font font);
    
}
