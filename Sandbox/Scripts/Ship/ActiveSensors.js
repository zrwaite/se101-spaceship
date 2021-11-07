//Based on ActiveSensors.cs

//import gameCore
//import galaxyMap
//import EMSReading;

import Vector2 from "../Helpers/Vector2";

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
		/*
		I used Vector2 for most node methods, because I assume it is vector math. I could be wrong.
		*/
		let scanArea = Math.Pi*Math.pow(range, 2)*arc/(Math.Pi*2); //This math seems weird to me, idk. Shouldn't Pi cancel out?
		let readings = []; //To be filled with EMSReadings
		let bodies = getOverlappingBodies(); //Needs to be imported from somewhere, maybe just changed
		let areas = getOverlappingAreas(); //Same as above comment
		let nodes = []; //To be filled with Node2Ds
		[...bodies, ...areas].forEach((node)=>(nodes.push(node))); //Adds all nodes from bodies and areas into nodes
		for (let i = 0; i<=nodes.length; i++){
			//Does the current body fall within the scan region?
			let toNode = nodes[i].globalPosition - globalPosition; //I don't know where these variables come from
			if (toNode.magnitude() > range) continue; //Outside of range
			//This Vector math comes from godot, not sure how to convert:
			let angleA = Vector2.Right.Rotated(heading).Angle() % (Math.Pi * 2); 
			let angleB = toNode.Angle() % (Math.Pi * 2);
			let angleBetween = angleA - angleB;
			if (Math.abs(angleBetween) > arc*0.5) continue; //Outside of heading/arc
			
			let instanceID = nodes[i].getInstanceId(); //I don't think we will be using instance ID stuff, but this is here anyways
			let positionDiff = nodes[i].globalPosition - globalPosition;
			let amplitude = globalPosition.distanceTo(nodes[i].globalPosition)/this.GConstant;
			let angle = Vector2.Right.AngleTo(positionDiff); //We will need to add constants to the Vector2 library.
			let materialSignature = "";
			let velocity = Vector2.zero;
			let collisionRadius = -1;
			let specialInfo = null;
			if (nodes[i] is 

			/* 			
			IHasScanSignature is an object with one attribute, ScanSignature

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