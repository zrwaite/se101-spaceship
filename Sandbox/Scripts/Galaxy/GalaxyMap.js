using Godot;
using System;
using System.Collections.Generic;

public class GalaxyMap : Node2D
{
    [Export] NodePath startingNodePath;

    public GalaxyMapNode StartingNode { get; private set; }

    public Godot.Collections.Array Nodes { get; private set; }
    public Godot.Collections.Array Edges { get; private set; }

    public GalaxyMapData GalaxyMapData { get; private set; }

    // Called when the node enters the scene tree for the first time.
    public override void _Ready()
    {
        if (startingNodePath != null)
        {
            var startNode = GetNode(startingNodePath);
            StartingNode = startNode as GalaxyMapNode;
        }

        Nodes = GetNode("Nodes").GetChildren();
        Edges = GetNode("Edges").GetChildren();

        GalaxyMapData = GenerateGalaxyMapData();
    }

    //Copy Godot-side hierarchy information over into "student safe" data containers
    GalaxyMapData GenerateGalaxyMapData()
    {
        //Data copies for GalaxyMapNodes
        var nodeDataToReturn = new List<GalaxyMapNodeData>();
        foreach (Node2D node in Nodes)
        {
            var newNodeData = new GalaxyMapNodeData();
            newNodeData.systemName = node.Name;
            newNodeData.galacticPosition = node.Position;
            nodeDataToReturn.Add(newNodeData);
        }

        //Data copies for GalaxyMapEdges
        var edgeDataToReturn = new List<GalaxyMapEdgeData>();
        foreach (GalaxyMapEdge edge in Edges)
        {
            var newEdgeData = new GalaxyMapEdgeData();
            newEdgeData.edgeCost = edge.EdgeCost;

            foreach (var nodeData in nodeDataToReturn)
            {
                if (nodeData.systemName == edge.NodeA.Name)
                {
                    newEdgeData.nodeA = nodeData;
                }

                if (nodeData.systemName == edge.NodeB.Name)
                {
                    newEdgeData.nodeB = nodeData;
                }
            }

            edgeDataToReturn.Add(newEdgeData);
        }

        //Let each NodeData know about relevant EdgeData
        foreach (var node in nodeDataToReturn)
        {
            List<GalaxyMapEdgeData> edges = new List<GalaxyMapEdgeData>();
            foreach (var edge in edgeDataToReturn)
            {
                if (edge.nodeA == node || edge.nodeB == node)
                {
                    edges.Add(edge);
                }
            }
            node.edges = edges.ToArray();
        }

        //Package the data up and return it to the caller
        GalaxyMapData dataToReturn = new GalaxyMapData();
        dataToReturn.nodeData = nodeDataToReturn.ToArray();
        dataToReturn.edgeData = edgeDataToReturn.ToArray();
        return dataToReturn;
    }

    public void RandomizeEdgeWeights(ulong seed)
    {
        if (seed == 0)
            return;

        var randomizer = new RandomNumberGenerator();
        randomizer.Seed = seed;

        foreach (GalaxyMapEdge edge in Edges)
        {            
            edge.EdgeCost = randomizer.RandiRange(3,10);
        }

    }
}
