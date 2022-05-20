import Asteroid from "./asteroid.js";
import Vector2 from "../helpers/Vector2.js";
const MAX_SPAWN_SPEED = 4;
const FRAMES_PER_SECOND = 60;
export default class AsteroidLauncher {
    constructor(game, pos, spawnPeriod = 4, spawnCount = -1, rotation = -1) {
        this.process = null;
        this.currentDelay = 0;
        this.game = game;
        this.pos = pos;
        this.spawnPeriod = spawnPeriod * FRAMES_PER_SECOND;
        // Expects positive integer... -1 denotes infinite projectiles
        this.spawnCount = spawnCount;
        // Expects positive radians values... rotation == -1 denotes random angle
        this.rotation = rotation;
    }
    initialize(process) {
        this.process = process;
    }
    /**
     * Functions gets the rotation angle for the launcher. Rotation can either be fixed or randomized depending on ctor input
     * @returns Positive float denoting rotation angle in radians
     */
    getAngle() {
        return this.rotation !== -1 ? this.rotation : Math.random() * 2 * Math.PI;
    }
    launchAsteroid() {
        // Check if additional objects should be created (decrement spawnCount if there are finite asteroids to create)
        if (this.spawnCount === 0)
            return;
        else if (this.spawnCount !== -1)
            this.spawnCount--;
        const speed = Math.random() * MAX_SPAWN_SPEED; // random speed		
        const angle = this.getAngle();
        const velocity = Vector2.right.rotate(angle).scale(speed); // random direction
        let asteroid = new Asteroid(velocity, Math.random() - 0.5, this.pos, this.game);
        if (this.process) {
            asteroid.initialize(this.process);
            this.process.spawnDeletableObject(asteroid);
        }
        else
            throw Error("This.process is not defined");
    }
    update() {
        if (this.spawnCount === 0)
            return;
        if (this.currentDelay === this.spawnPeriod) {
            this.launchAsteroid();
            this.currentDelay = 0;
        }
        else {
            this.currentDelay++;
        }
    }
}
