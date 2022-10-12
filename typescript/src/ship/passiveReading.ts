export class PassiveReading {
	heading
	gravity
	constructor(angle: number, gravity: number) {
		this.heading = angle //number
		this.gravity = gravity // mass/(distance^2);
	}
}
