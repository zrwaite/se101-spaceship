// import Node2D from '<SOMEWHERE>';

export default class RegularExplosion extends Node2D {

  // Called when the node enters the scene tree for the first time.
  _Ready() {
    let animator = FindNode("AnimationPlayer"); // as AnimationPlayer;
    animator.Play("Explosion");

    Rotation = Math.random() * 360;
  }
}
