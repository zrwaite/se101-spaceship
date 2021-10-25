export default class TestShip {
	constructor () {
		this.shipName = "TestShip";
        this.image = "ship";
        this.context = "ships";
        this.size = {x: 4, y: 3};
	  	this.linearPosition = {x: 5, y: 5}; // the location of the CENTER of the ship, in units
        this.angularPosition = 0;
        this.linearVelocity = {x: 0, y: 0};
        this.angularVelocity = 0;
    }
    start () {
        console.log(this.shipName + " has begun its journey.");
    }
    simplePhysicsUpdate () {
        // For working with canvas stuff.
        this.linearPosition.x += this.linearVelocity.x;
        this.linearPosition.y += this.linearVelocity.y;
        this.angularPosition += this.angularVelocity;
    }
}