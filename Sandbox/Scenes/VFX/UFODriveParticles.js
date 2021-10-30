import { Node2D, GetNode } from '<SOMEWHERE>';

export default class UFODriveParticles extends Node2D {

  constructor() {
    this.ringParticles = null;    // Particles2D
  }

  // Called when the node enters the scene tree for the first time.
  _Ready() {
    // Pass in type as optional second param
    this.ringParticles = GetNode("RingParticles", "Particles2D");
    this.ringParticles.Emitting = false;
  }

  /**
   *
   * @param {bool} isEmitting
   * @returns void
   */
  SetEmitting(isEmitting) {
    this.ringParticles.Emitting = isEmitting;
  }
}
