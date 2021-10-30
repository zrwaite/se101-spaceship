import { Node2D, GetNode } from '<SOMEWHERE>';
import GalaxyMapData from './GalaxyMapData.js';
import GalaxyMapNodeData from './GalaxyMapNodeData.js';
import GalaxyMapEdgeData from './GalaxyMapEdgeData.js';
import RandomNumberGenerator from '<SOMEWHERE>';

export default class GalaxyMap extends Node2D {

  constructor() {
    this.startingNodePath = null; // NodePath
    this.startingNode = null;     // GalaxyMapNode

    this.nodes = null;            // Godot.Collections.Array
    this.edges = null;            // Godot.Collections.Array

    this.galaxyMapData = null;    // GalaxyMapData
  }

  // Define getters and setters
  get StartingNode() { return this.startingNode; }
  set StartingNode(value) { this.startingNode = value; }

  get Nodes() { return this.nodes; }
  set Nodes(value) { this.nodes = value; }

  get Edges() { return this.edges; }
  set Edges(value) { this.edges = value; }

  get GalaxyMapData() { return this.galaxyMapData; }
  set GalaxyMapData(value) { this.galaxyMapData = value; }

  // Called when the node enters the scene tree for the first time.
  _Ready() {
    if (this.startingNodePath) {
        let startNode = GetNode(this.startingNodePath);
        this.startingNode = startNode; // as GalaxyMapNode;
    }

    this.nodes = GetNode("Nodes").GetChildren();
    this.edges = GetNode("Edges").GetChildren();

    this.galaxyMapData = this.GenerateGalaxyMapData();
  }

  //Copy Godot-side hierarchy information over into "student safe" data containers
  /**
 *
 * @returns GalaxyMapData
 */
  GenerateGalaxyMapData() {
      //Data copies for GalaxyMapNodes
      let nodeDataToReturn = []; // GalaxyMapNodeData
      for (let node of this.nodes) { // Node2D
          let newNodeData = new GalaxyMapNodeData();
          newNodeData.systemName = node.Name;
          newNodeData.galacticPosition = node.Position;
          nodeDataToReturn.push(newNodeData);
      }

      //Data copies for GalaxyMapEdges
      var edgeDataToReturn = []; // GalaxyMapEdgeData
      for (let edge of this.Edges) {
          let newEdgeData = new GalaxyMapEdgeData();
          newEdgeData.edgeCost = edge.EdgeCost;

          for (let nodeData of nodeDataToReturn) {
              if (nodeData.systemName === edge.NodeA.Name) {
                  newEdgeData.nodeA = nodeData;
              }
              if (nodeData.systemName === edge.NodeB.Name) {
                  newEdgeData.nodeB = nodeData;
              }
          }
          edgeDataToReturn.push(newEdgeData);
      }

      //Let each NodeData know about relevant EdgeData
      for (let node of nodeDataToReturn) {
          let edges = []; // GalaxyMapEdgeData
          for (let edge of edgeDataToReturn) {
              if (edge.nodeA === node || edge.nodeB === node) {
                  edges.push(edge);
              }
          }
          node.edges = edges.ToArray();
      }

      //Package the data up and return it to the caller
      let dataToReturn = new GalaxyMapData();
      dataToReturn.nodeData = nodeDataToReturn.ToArray();
      dataToReturn.edgeData = edgeDataToReturn.ToArray();
      return dataToReturn;
  }

  /**
   *
   * @param {number} seed
   * @returns void
   */
  RandomizeEdgeWeights(seed)
  {
      if (seed == 0) {
          return;
      }

      let randomizer = new RandomNumberGenerator();
      randomizer.Seed = seed;

      for (let edge of this.Edges) {  // GalaxyMapEdge
          edge.EdgeCost = randomizer.RandiRange(3,10);
      }
  }
}
