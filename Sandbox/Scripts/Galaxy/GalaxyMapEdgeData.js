using Godot;
using System;

public class GalaxyMapEdgeData
{
    public float edgeCost;
    public GalaxyMapNodeData nodeA;
    public GalaxyMapNodeData nodeB;

/// <summary>
/// Convenience function for returning the node at the other end of an edge
/// given one of either nodeA or nodeB.
/// Returns null if passed a node that doesn't belong to this edge.
/// </summary>
/// <param name="startNode"></param>
/// <returns></returns>
    public GalaxyMapNodeData GetOtherNode(GalaxyMapNodeData startNode)
    {
        if (startNode == nodeA)
            return nodeB;
        else if (startNode == nodeB)
            return nodeA;
        else
            return null;
    }
}
