
export default class GalaxyMapEdgeData {

  constructor() {
    this.edgeCost = null;   // float
    this.nodeA = null;      // GalaxyMapNodeData
    this.nodeB = null;      // GalaxyMapNodeData
  }

  // Convenience function for returning the node at the other end of an edge
  // given one of either nodeA or nodeB.
  // Returns null if passed a node that doesn't belong to this edge.
  /**
   *
   * @param {GalaxyMapNodeData} startNode
   * @returns GalaxyMapNodeData
   */
  GetOtherNode(startNode) {
    if (startNode === this.nodeA) {
      return this.nodeB;
    } else if (startNode === this.nodeB) {
      return this.nodeA;
    } else {
      return null;
    }
  }
}
