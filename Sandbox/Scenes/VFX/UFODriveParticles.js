// import Node2D from '<SOMEWHERE>';

export default class UFODriveParticles extends Node2D {

  constructor() {
    this.ringParticles = undefined;
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
