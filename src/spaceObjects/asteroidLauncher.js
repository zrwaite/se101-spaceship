import Asteroid from "./asteroid.js";
import Vector2 from "../helpers/Vector2.js";

const MAX_SPAWN_SPEED = 0.4;

export default class AsteroidLauncher{
	constructor(pos, game) {
		this.game = game;
		this.pos = pos;
	}
	launchAsteroid(){
		const speed = Math.random()*MAX_SPAWN_SPEED;									// random speed		
		const velocity = Vector2.right.rotate(Math.random()*2*Math.PI).scale(speed); 	// random direction
		let asteroid = new Asteroid(velocity, Math.random()-0.5, this.pos, this.game);	
		this.game.spawnDeletableObject(asteroid);
	}
}	