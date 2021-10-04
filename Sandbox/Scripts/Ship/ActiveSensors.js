//Based on ActiveSensors.cs

//import gameCore
//import galaxyMap
//import EMSReading;

export default class ActiveSensors extends IActiveSensors{
	constructor(...args){
		super(...args);
		this.EMConstant = 1; //Don't know what this does
		this.GConstant = 3; //Constant for the strength of the sensor reading, proportional to distance
		
		
		this.gameCore; //Primary game information //GameCore
		this.galaxyMap; //Current Level map //GalaxyMap
		
	}
	/* Events to watch for?
		OnScanPerformed;

		*/
	PerformScan(heading, arc, range){
		var scanArea = Math.Pi*Math.pow(range, 2)*arc/(Math.Pi*2); //This math seems weird to me, idk. Shouldn't Pi cancel out?
		var readings = []; //To be filled with EMSReadings
		var bodies = getOverlappingBodies(); //Needs to be imported from somewhere, maybe just changed
		var areas = getOverlappingAreas(); //Same as above comment
		var nodes = []; //To be filled with Node2Ds
		[...bodies, ...areas].forEach((node)=>(nodes.push(node))); //Adds all nodes from bodies and areas into nodes
		for (var i = 0; i<=nodes.length; i++){
			//Does the current body fall within the scan region?
			var toNode = node2D.GlobalPosition - GlobalPosition; //I don't know where these variables come from
			if (toNode.Length() > range) continue; //Outside of range
			//This Vector math comes from godot, not sure how to convert:
			var angleA = Vector2.Right.Rotated(heading).Angle() % (Math.Pi * 2); 
			var angleB = toNode.Angle() % (Math.Pi * 2);
			var angleBetween = angleA - angleB;
			if (Math.abs(angleBetween) > arc*0.5) continue; //Outside of heading/arc

			/* This code gets really into the weeds with godot built in stuff
			I will come back to this later. Godot code:

			//If so, package it up as an EMSReading to return to the caller
            ulong instanceID = node2D.GetInstanceId();
            Vector2 positionDiff = node2D.GlobalPosition - GlobalPosition;
            float amplitude = GlobalPosition.DistanceTo(node2D.GlobalPosition) / GConstant;
            float angle = Vector2.Right.AngleTo(positionDiff);
            string materialSignature = string.Empty;
            Vector2 velocity = Vector2.Zero;
            float collisionRadius = -1f;
            string specialInfo = null;

            if (node2D is IHasScanSignature signature) materialSignature = signature.ScanSignature;
            if (node2D is RigidBody2D rigidBody) velocity = rigidBody.LinearVelocity;
            if (node2D is IHasCollisionRadius hasRadius) collisionRadius = hasRadius.CollisionRadius;
            if (node2D is WarpGate warpGate)specialInfo = warpGate.DestinationSolarSystemName;
            var newReading = new EMSReading(instanceID, angle, amplitude, velocity, collisionRadius, materialSignature, specialInfo);
            readings.Add(newReading);

			*/
		}
		//Godot code: OnScanPerformed?.Invoke(scanArea * 0.001f);
		return readings;
	}
	_Process(delta){
		Update(); //Causes _Draw to be called again (each frame)
	}
	_Draw(){}
}