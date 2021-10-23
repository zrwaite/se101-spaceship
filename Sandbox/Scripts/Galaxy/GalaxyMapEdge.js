using Godot;
using System;

public class GalaxyMapEdge : Node2D
{
    [Export] NodePath nodeAPath;
    [Export] NodePath nodeBPath;
    [Export] float edgeCost = 1;

    Label cost;

    public GalaxyMapNode NodeA { get; private set; }
    public GalaxyMapNode NodeB { get; private set; }

    public Node2D Line { get; private set; }

    public float EdgeCost { get { return edgeCost; } set { edgeCost = value; } }

    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        ConnectNodeEndpoints();
        cost = FindNode("EdgeCost") as Label;
    }

    public void ConnectNodeEndpoints()
    {
        try
        {
            //GD.Print($"Connecting Node endpoints - {nodeAPath} to {nodeBPath}");
            NodeA = GetNode<GalaxyMapNode>(nodeAPath);
            NodeB = GetNode<GalaxyMapNode>(nodeBPath);
            Line = GetNode<Node2D>("Line");
        }
        catch (Exception ex)
        {
            GD.PrintErr("Exception: " + ex);
        }
    }

    // Called every frame. 'delta' is the elapsed time since the previous frame.
    public override void _Process(float delta)
    {
        if (NodeA != null && NodeB != null)
        {
            Vector2 AtoB = (NodeB.GlobalPosition - NodeA.GlobalPosition);
            this.Position = NodeA.GlobalPosition + AtoB * 0.5f;
            cost.Text = edgeCost.ToString();
            Line.GlobalScale = new Vector2(AtoB.Length() * 0.25f, 1f);
            Line.LookAt(NodeB.GlobalPosition);
        }
        else
        {
            //GD.Print($"Both Node endpoints must be specified. {NodeA} : {NodeB}");
        }

    }
}
